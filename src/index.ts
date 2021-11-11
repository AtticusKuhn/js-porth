import nearley from "nearley"
// import lexer from "./lexer";
import fs from "fs"
//@ts-ignore
const grammar = require("../grammar.js")
// Create a Parser object from our grammar.

type either<A, B> = {
    type: "fail",
    value: A,
} | { type: "success", value: B }
const left = <A, B>(a: A): either<A, B> => ({ type: "fail", value: a })
const right = <A, B>(b: B): either<A, B> => ({ type: "success", value: b })

type loc = {
    start: any,
    end: any
}
type Conditional = { type: 'if', body: AST } & loc
    | { type: 'ifElse', body: AST, elseBranch: AST, elseCondition?: AST } & loc
type Proc = { type: "proc", name: string, body: AST } & loc
type str = { type: "string_literal", value: string } & loc
type Constant = { type: 'const', name: string, body: AST } & loc
type Node = { type: "number_literal", value: number } & loc
    | str
    | { type: "include", file: str }
    | { type: 'plus', value: '+' } & loc
    | { type: 'minus', value: '-' } & loc
    | { type: 'print', value: 'print' } & loc
    | { type: 'swap', value: 'swap' } & loc
    | { type: 'over', value: 'over' } & loc
    | { type: 'dup', value: 'dup' } & loc
    | { type: 'mod', value: 'mod' } & loc
    | { type: 'drop', value: 'drop' } & loc
    | { type: 'lt', value: '<' } & loc
    | { type: 'eq', value: '=' } & loc
    | { type: 'identifier', value: string } & loc
    | Constant
    | { type: 'macro', name: string, body: AST } & loc
    | { type: 'memory', name: string, body: AST } & loc
    | { type: 'while', condition: AST, body: AST } & loc
    | { type: 'comment', value: string } & loc
    | { type: 'load8', value: "@8" } & loc
    | { type: 'store8', value: "!8" } & loc
    | { type: 'shl', value: "shl" } & loc
    | { type: 'shr', value: "shr" } & loc
    | { type: 'or', value: "or" } & loc
    | { type: 'and', value: "and" } & loc
    | Conditional
    | Proc



type AST = Node[];
function parse(code: string): either<string, AST> {
    // Parse something!
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    if (parser.results.length > 1) {
        for (let i = 0; i < parser.results.length; i++) {
            fs.writeFileSync(`./debug/${i}.json`, JSON.stringify(parser.results[i], null, 4))
        }
        return left("ambiguous parser")
    }
    if (parser.results.length === 0) {
        return left("no parse found")
    }
    return right(parser.results[0])

}
type Context = {
    procs: Record<string, Proc>,
    consts: Record<string, number>,
    memories: Record<string, number>,
    memorySize: number;
}
// type constVal = string | number;
const getContext = (ast: AST): { ast: AST, context: Context } => {
    const ctx: Context = {
        procs: {},
        consts: {},
        memories: {},
        memorySize: 0
    };
    for (const node of ast) {
        if (node.type === "const") {
            ctx.consts[node.name] = evalStatements(node.body, ctx)
        }
        if (node.type === "proc") {
            ctx.procs[node.name] = node
        }
        if (node.type === "memory") {
            ctx.memories[node.name] = ctx.memorySize
            ctx.memorySize += evalStatements(node.body, ctx)
        }
    }
    let l = ast.length;
    for (let i = 0; i < l; i++) {
        let node = ast[i]
        if (node.type === "identifier") {
            if (node.value in ctx.consts) {
                //@ts-ignore
                node.type = "number_literal"
                //@ts-ignore
                node.value = ctx.consts[node.value]
            } else if (node.value in ctx.memories) {
                //@ts-ignore
                node.type = "number_literal"
                //@ts-ignore
                node.value = ctx.memories[node.value]
            } else {
                throw new Error(`no value found for the idenfitifer: ${node.value}`)
            }
        }
        if (node.type === "const") {
            ast.splice(i, 1);
            l--;
        }
        if (node.type === "include") {
            const file = parseAndProcess(fs.readFileSync(node.file.value, "utf-8"))
            ast.splice(i, 1);
            // Object.assign(ctx, file.context)
            ast.splice(i, 0, ...file.ast)
            l += file.ast.length - 1
        }
        // if(node.type === "")
    }
    return { ast, context: ctx }
}
// const preProcessor = (ast: AST, context: Context): either<string, AST> => {
//     for (const node of ast) {
//         if (node.type === 'const') {

//         }
//         if (node.type === "identifier") {
//             if (node.value in context.consts) {
//                 const c = context.consts[node.value]
//                 //@ts-ignore
//                 node.type = c.body.type
//                 //@ts-ignore
//                 node.value = c.body.value
//             }
//         }
//     }
//     return right(ast)
// }
function evalStatements(ast: AST, ctx: Context): number {
    const evalledCode = `${genCode(ast, ctx)};\n return stack[0];`
    const code = new Function(evalledCode);
    return code();

}
function assertUnreachable(x: never): never {
    throw new Error(` ${JSON.stringify(x, null, 4)} Didn't expect to get here`);
}
function genCodeAux(ast: AST, ctx: Context): string {
    return ast.map((node: Node) => {
        let code = ""
        code += `// code for ${node.type} \n`
        switch (node.type) {
            case "number_literal":
                code += `stack.push(${node.value})`
                break;
            case "string_literal":
                code += `stack.push(${JSON.stringify(node.value)})`
                break
            case "plus":
                code += `stack.plus()`
                break;
            case "minus":
                code += `stack.minus()`
                break;
            case "print":
                code += `stack.print()`
                break
            case "const":
                code += `stack.push(${ctx.consts[node.name]})`
                break
            case "while":
                code += `
// while loop
while (
    ((stack) => { ${genCodeAux(node.condition, ctx)}; return stack.pop() })(stack)) { ${genCodeAux(node.body, ctx)} } `
                break
            case "swap":
                code += `stack.swap()`; break
            case "over":
                code += `stack.over()`; break
            case "dup":
                code += `stack.dup()`; break
            case "mod":
                code += `stack.mod()`; break
            case "drop":
                code += `stack.drop()`; break
            case "lt":
                code += `stack.lt(); `; break
            case "identifier":
                code += `//identifier ${node.value} \n`
                if (node.value in ctx.consts) {
                    code += `stack.push(${ctx.consts[node.value]})`
                } else if (node.value in ctx.procs) {
                    code += `${ctx.procs[node.value]}()`
                } else if (node.value in ctx.memories) {
                    code += `stack.push(${ctx.memories[node.value]})`
                } else {
                    throw new Error(`undefined indentifier ${node.value}`)
                }
                // code += `throw new Error("there should be no identifiers in the final code: ${node.value}");\n`
                break;
            case "eq":
                code += "stack.eq()"; break;
            case "macro":
                throw new Error(`should not occur at this stage of compilation`)
            case "memory":
                code += `stack.push(${ctx.memories[node.name]})`; break
            case "if":
                code += `if(stack.pop()){${genCodeAux(node.body, ctx)}}`; break
            case "ifElse":
                code += `if(stack.pop()){${genCodeAux(node.body, ctx)}}else{ ${node.elseCondition ? genCodeAux(node.elseCondition, ctx) : ""}; ${genCodeAux(node.elseBranch, ctx)}}`; break
            case "proc":
                throw new Error(`proc is not yet implemented`)
            case "comment":
                code += `//${node.value} \n`; break
            case "load8":
                code += `stack.load8()`; break
            case "store8":
                code += `stack.store8()`; break
            case "shl":
                code += `stack.shr()`; break
            case "shr":
                code += `stack.shl()`; break
            case "or":
                code += `stack.or()`; break
            case "and":
                code += `stack.and()`; break
            case "include":
                code += `// include file \n`; break
            default:
                return assertUnreachable(node)
        }
        return code
    }).join(";\n")
}

function genCode(ast: AST, ctx: Context): string {
    const main = genCodeAux(ast, ctx);
    const header = `let stack = []; \n
    let memory  = new Uint8Array(${ctx.memorySize});    
Array.prototype.lt = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")
    return this.push(a < b)
}
Array.prototype.eq = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for eq")
    return this.push(a === b)
}
Array.prototype.mod = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for mod")
    return this.push(b % a )
}
Array.prototype.shl = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for shl")
    return this.push(b >> a )
};
Array.prototype.shr = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for shr")
    return this.push(b << a )
}
Array.prototype.or = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for or")
    return this.push(b || a )
};
Array.prototype.and = function () {
    let a = this.pop()
    let b=  this.pop()
    if(a===undefined || b===undefined) throw new Error("not enough arguments for and")
    return this.push(b && a )
}
Array.prototype.over = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for over intrinsic")
    }
    this.push(b)
    this.push(a)
    this.push(b)
}
Array.prototype.dup = function () {
    let a = this.pop()
    if(a===undefined) throw new Error("not enough arguments for dup")
    this.push(a)
    this.push(a)
}
Array.prototype.drop = function () {
    let a= this.pop()
    if(a===undefined) throw new Error("not enough arguments for drop")
}
Array.prototype.plus = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for plus")
    this.push(a+b)
}
Array.prototype.minus = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for minus")
    this.push(a-b)
}
Array.prototype.print = function () {
    let a =this.pop()
    if(a===undefined) throw new Error("not enough arguments for print")
    console.log(a)
}
Array.prototype.swap = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for swap intrinsic")
    }
    this.push(a)
    this.push(b)
}
Array.prototype.store8 = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")
    memory[a] = b;
}
Array.prototype.load8 = function () {
    let a = this.pop()
    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")
    this.push(memory[a])
}
    `
    return header + main;
}
function parseAndProcess(s: string): { ast: AST, context: Context } {
    const maybeAST = parse(s)
    if (maybeAST.type === "fail") {
        throw new Error(maybeAST.value)
    } else {
        return getContext(maybeAST.value)
        // fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 4))
        // const code = genCode(ast, context)
        // return ast;
        // fs.writeFileSync("./generated.js", code)
    }
}
function main() {
    const prog = fs.readFileSync("src/example.porth", "utf-8")
    const maybeAST = parse(prog)
    if (maybeAST.type === "fail") {
        throw new Error(maybeAST.value)
    } else {
        const { ast, context } = getContext(maybeAST.value)
        fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 4))
        const code = genCode(ast, context)
        fs.writeFileSync("./generated.js", code)
    }
}
main()