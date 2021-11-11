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
type Node = { type: "number_literal", value: number } & loc
    | { type: "string_literal", value: string } & loc
    | { type: 'plus', value: '+' } & loc
    | { type: 'print', value: 'print' } & loc
    | { type: 'swap', value: 'swap' } & loc
    | { type: 'over', value: 'over' } & loc
    | { type: 'dup', value: 'dup' } & loc
    | { type: 'mod', value: 'mod' } & loc
    | { type: 'drop', value: 'drop' } & loc
    | { type: 'lt', value: '<' } & loc
    | { type: 'eq', value: '=' } & loc
    | { type: 'identifier', value: string } & loc
    | { type: 'const', name: string, body: AST } & loc
    | { type: 'macro', name: string, body: AST } & loc
    | { type: 'memory', name: string, body: AST } & loc
    | { type: 'while', condition: AST, body: AST } & loc
    | Conditional



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
function evalStatements(ast: AST): number | string {
    const code = new Function(`${genCode(ast)};\n return stack[0];`)
    return code()
}
function assertUnreachable(x: never): never {
    throw new Error(` ${JSON.stringify(x, null, 4)} Didn't expect to get here`);
}
function genCodeAux(ast: AST): string {
    return ast.map((node: Node) => {
        let code = ""
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
            case "print":
                code += `stack.print()`
                break
            case "const":
                code += `                // const loop
const ${node.name} = ${evalStatements(node.body)
                    } `
                break
            case "while":
                code += `
// while loop
while (
    ((stack) => { ${genCodeAux(node.condition)}; return stack.pop() })(stack)) { ${genCodeAux(node.body)} } `
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
                break;
            case "eq":
                code += "stack.eq()"; break;
            case "macro":
                throw new Error(`should not occur at this stage of compilation`)
            case "memory":
                throw new Error(`memory is not implemented`)
            case "if":
                code += `if(stack.pop()){${genCodeAux(node.body)}}`; break
            case "ifElse":
                code += `if(stack.pop()){${genCodeAux(node.body)}}else{ ${node.elseCondition ? genCodeAux(node.elseCondition) : ""}; ${genCodeAux(node.elseBranch)}}`; break
            default:
                return assertUnreachable(node)
        }
        return code
    }).join(";\n")
}

function genCode(ast: AST): string {
    const main = genCodeAux(ast);
    const header = `let stack = []; \n
Array.prototype.lt = function () {
    return this.push(this.pop() > this.pop())
}
Array.prototype.eq = function () {
    return this.push(this.pop() === this.pop())
}
Array.prototype.mod = function () {
    let a = this.pop()
    let b=  this.pop()
    return this.push(b % a )
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
    this.push(a)
    this.push(a)
}
Array.prototype.drop = function () {
    this.pop()
}
Array.prototype.plus = function () {
    stack.push(stack.pop() + stack.pop())
}
Array.prototype.print = function () {
    console.log(stack.pop())
}
Array.prototype.swap = function () {
    let a = stack.pop()
    let b = stack.pop()
    if (a === undefined || b === undefined) {
        throw new Error("not enough arguments for swap intrinsic")
    }
    stack.push(a)
    stack.push(b)
}
    `
    return header + main;
}
function main() {
    const prog = fs.readFileSync("src/example.porth", "utf-8")
    const ast = parse(prog)

    if (ast.type === "fail") {
        throw new Error(ast.value)
    } else {
        fs.writeFileSync("./ast.json", JSON.stringify(ast.value, null, 4))
        const code = genCode(ast.value)
        fs.writeFileSync("./generated.js", code)
    }
}
main()