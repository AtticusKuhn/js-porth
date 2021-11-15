import nearley from "nearley"
// import lexer from "./lexer";
// import fs from "fs"
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
    | { type: 'gt', value: '<' } & loc
    | { type: 'eq', value: '=' } & loc
    | { type: 'identifier', value: string } & loc
    | Constant
    | { type: 'macro', name: string, body: AST } & loc
    | { type: 'memory', name: string, body: AST } & loc
    | { type: 'while', condition: AST, body: AST } & loc
    | { type: 'comment', value: string } & loc
    | { type: 'load8', value: "@8" } & loc
    | { type: 'store8', value: "!8" } & loc
    | { type: 'load16', value: "@8" } & loc
    | { type: 'store16', value: "!8" } & loc
    | { type: 'load64', value: "@64" } & loc
    | { type: 'store64', value: "!64" } & loc
    | { type: 'load32' } & loc
    | { type: 'store32' } & loc
    | { type: 'not' } & loc
    | { type: 'ge' } & loc
    | { type: 'le' } & loc
    | { type: 'here' } & loc
    | { type: 'stop' } & loc
    | { type: 'not' } & loc
    | { type: 'rot' } & loc
    | { type: 'ne' } & loc
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
    try {
        parser.feed(code);
        if (parser.results.length > 1) {
            for (let i = 0; i < parser.results.length; i++) {
                console.log("ambiguous parser")
                // fs.writeFileSync(`./debug/${i}.json`, JSON.stringify(parser.results[i], null, 4))
            }
            return left("ambiguous parser")
        }
        if (parser.results.length === 0) {
            return left("no parse found")
        }
        return right(parser.results[0])
    } catch (e) {
        return left(e as string);
    }

}
type Context = {
    procs: Record<string, Proc>,
    consts: Record<string, number>,
    memories: Record<string, number>,
    memorySize: number;
}
// type constVal = string | number;
const getContext = async (ast: AST): Promise<{ ast: AST, context: Context }> => {
    let ctx: Context = {
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
            //@ts-ignore
            ctx.procs[node.name] = genCodeAux(node.body, ctx)
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
                // node.type = "number_literal"
                //@ts-ignore
                // node.value = ctx.consts[node.value]
            } else if (node.value in ctx.memories) {
                //@ts-ignore
                // node.type = "number_literal"
                //@ts-ignore
                // node.value = ctx.memories[node.value]
            } else if (node.value in ctx.procs) {
                // //@ts-ignore
                // node.type = "ident"
                // //@ts-ignore
                // node.value = node.value// ctx.procs[node.value]
            } else {
                throw new Error(`no value found for the idenfitifer: ${node.value}`)
            }
        }
        if (node.type === "const") {
            ast.splice(i, 1);
            l--;
        }
        if (node.type === "proc") {
            ast.splice(i, 1);
            l--;
        }
        if (node.type === "memory") {
            ast.splice(i, 1);
            l--;
        }
        if (node.type === "include") {
            try {
                let req = await fetch(node.file.value)
                const text = await req.text()
                console.log("text is", text)
                const file = await parseAndProcess(text)//fs.readFileSync(node.file.value, "utf-8"))
                ast.splice(i, 1);
                ctx = {
                    consts: { ...ctx.consts, ...file.context.consts },
                    procs: { ...ctx.procs, ...file.context.procs },
                    memories: { ...ctx.memories, ...file.context.memories },
                    memorySize: ctx.memorySize + file.context.memorySize,
                }
                ast.splice(i, 0, ...file.ast)
                l += file.ast.length - 1
            } catch (e) {
                console.log("error is", e)
                throw new Error(`cannot include file (it doesn't exist)`)
            }

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
    const evalledCode = `${genCode(ast, ctx)};\n
    if(typeof stack[0] === "string"){
     return JSON.stringify(stack[0]);
    }else{
        return stack[0]
    }
     `
    const code = new Function(evalledCode);
    return code();

}
function assertUnreachable(x: never): never {
    throw new Error(` ${JSON.stringify(x, null, 4)} Didn't expect to get here`);
}
function genCodeAux(ast: AST, ctx: Context): string {
    return ast.map((node: Node) => {
        let code = ""
        code += `// generated code for ${node.type} operation \n`
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
            case "gt":
                code += `stack.gt(); `; break
            case "identifier":
                code += `//identifier ${node.value} \n`
                if (node.value in ctx.consts) {
                    code += `stack.push(${ctx.consts[node.value]})`
                } else if (node.value in ctx.procs) {
                    code += `${node.value}()`
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
                code += `if(stack.pop()){\n\t${genCodeAux(node.body, ctx)}}`; break
            case "ifElse":
                code += `if(stack.pop()){\n\t${genCodeAux(node.body, ctx)}}else{\n\t${node.elseCondition ? genCodeAux(node.elseCondition, ctx) : ""}; ${genCodeAux(node.elseBranch, ctx)}}`; break
            case "proc":
                throw new Error(`proc should not occur here this is a bug in parsing.`)
            case "comment":
                code += `//${node.value} \n`; break
            case "load8":
                code += `stack.load8()`; break
            case "store8":
                code += `stack.store8()`; break
            case "load16":
                code += `stack.load16()`; break
            case "store16":
                code += `stack.store16()`; break
            case "load64":
                code += `stack.load64()`; break
            case "store64":
                code += `stack.store64()`; break
            case "shl":
                code += `stack.shr()`; break
            case "shr":
                code += `stack.shl()`; break
            case "or":
                code += `stack.or()`; break
            case "and":
                code += `stack.and()`; break
            case "load32":
                code += `stack.load32()`; break
            case "store32":
                code += `stack.store32()`; break
            case "not":
                code += `stack.not()`; break
            case "ge":
                code += `stack.ge()`; break
            case "le":
                code += `stack.and()`; break
            case "here":
                code += `stack.push("${node.start}-${node.end}")`; break
            case "stop":
                code += `throw new Error("program stopping")`; break
            case "rot":
                code += `stack.rot()`; break
            case "ne":
                code += `stack.ne()`; break
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
Array.prototype.rot = function(){
    let a = this.pop()
    let b = this.pop()
    let c = this.pop()
    this.push(b)
    this.push(a)
    this.push(c)

}
Array.prototype.store32 = function() {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b===undefined) throw new Error("not enough arguments for store32 intrinsic")
    memory[a] = b;
}
Array.prototype.load32 = function() {
    let a = this.pop()
    if (a === undefined) throw new Error("not enough arguments for load32 intrinsic")
    this.push(memory[a])
}
Array.prototype.lt = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")
    return this.push(b < a)
}
Array.prototype.ge = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for ge")
    return this.push(b >= a)
}
Array.prototype.le = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for le")
    return this.push(b <= a)
}
Array.prototype.not = function () {
    let a = this.pop();
    if(a===undefined) throw new Error("not enough arguments for not")
    return this.push(!a)
}

Array.prototype.gt = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for lt")
    return this.push(b > a)
}
Array.prototype.eq = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for eq")
    return this.push(a === b)
}
Array.prototype.ne = function () {
    let a = this.pop();
    let b = this.pop();
    if(a===undefined || b===undefined) throw new Error("not enough arguments for ne")
    return this.push(a !== b)
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
Array.prototype.store16 = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")
    memory[a] = b;
}
Array.prototype.load16 = function () {
    let a = this.pop()
    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")
    this.push(memory[a])
}
Array.prototype.store64 = function () {
    let a = this.pop()
    let b = this.pop()
    if (a === undefined || b===undefined) throw new Error("not enough arguments for store8 intrinsic")
    memory[a] = b;
}
Array.prototype.load64 = function () {
    let a = this.pop()
    if (a === undefined ) throw new Error("not enough arguments for load8 intrinsic")
    this.push(memory[a])
}`
    const procs = Object.entries(ctx.procs).map(([key, value]) => {
        return `function ${key}(){
           ${value}
        };\n`
    })
    const end = `\nif(stack.length > 0){
    throw new Error("unhandled data on the stack")
}`
    return header + procs + main + end;
}
async function parseAndProcess(s: string): Promise<{ ast: AST, context: Context }> {
    const maybeAST = parse(s)
    if (maybeAST.type === "fail") {
        throw new Error(maybeAST.value)
    } else {
        return await getContext(maybeAST.value)
        // fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 4))
        // const code = genCode(ast, context)
        // return ast;
        // fs.writeFileSync("./generated.js", code)
    }
}
export const captureEval = (code: string): string => {
    try {
        let stdout = ""
        let tmp = console.log
        console.log = (...msg) => {
            stdout += `${msg.join(" ")}\n`;
            tmp(...msg)
        }
        eval(code)
        // stdout += `${e}\n`

        console.log = tmp;
        return stdout;
        // fs.writeFileSync("./generated.js", code)

    } catch (e) {
        return `${e}`
    }
}
export async function main(prog: string): Promise<string> {
    // const prog = "1 2 + print";//fs.readFileSync("src/example.porth", "utf-8")

    console.log("prog is", prog)
    const maybeAST = parse(prog)
    if (maybeAST.type === "fail") {
        return maybeAST.value
    } else {
        // fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 4))
        try {
            const { ast, context } = await getContext(maybeAST.value)
            const code = genCode(ast, context)
            return code
        } catch (e) {
            return `throw new Error("Compiler error: ${e}")`
        }
    }
}
// main()