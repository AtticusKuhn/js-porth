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
type Node = { type: "number_literal", value: number } & loc
    | { type: 'plus', value: '+' } & loc
    | { type: 'print', value: 'print' } & loc
    | { type: 'swap', value: 'swap' } & loc
    | { type: 'over', value: 'over' } & loc
    | { type: 'dup', value: 'dup' } & loc
    | { type: 'lt', value: '<' } & loc
    | { type: 'identifier', value: string } & loc
    | { type: 'const', name: string, body: AST } & loc
    | { type: 'macro', name: string, body: AST } & loc
    | { type: 'memory', name: string, body: AST } & loc
    | { type: 'while', condition: AST, body: AST } & loc


type AST = Node[];
function parse(code: string): either<string, AST> {
    // Parse something!
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    if (parser.results.length > 1) {
        return left("ambiguos parser")
    }
    if (parser.results.length === 0) {
        return left("no parse found")
    }
    console.log("results is", parser.results)
    return right(parser.results[0])

}
function evalStatements(ast: AST): number | string {
    const code = new Function(`${genCode(ast)};\n return stack[0];`)
    return code()
}
function genCodeAux(ast: AST): string {
    return ast.map((node: Node) => {
        let code = ""
        switch (node.type) {
            case "number_literal":
                code += `stack.push(${node.value})`
                break;
            case "plus":
                code += `stack.push(stack.pop() + stack.pop())`
                break;
            case "print":
                code += `console.log("[LOG]",stack.pop())`
                break
            case "const":
                code += `                // const loop
const ${node.name} = ${evalStatements(node.body)}`
                break
            case "while":
                code += `
                // while loop
                while(
                    ((stack)=>{${genCodeAux(node.condition)}; return stack.pop()})(stack)){${genCodeAux(node.body)}}`
                break
            case "swap":
                code += `
                //swap
                (()=>{let a = stack.pop()
                let b = stack.pop()
                if(a===undefined || b===undefined){
                    throw new Error("not enough arguments for swap intrinsic")
                }
                stack.push(a)
                stack.push(b)})()`; break
            case "over":
                code += `
                //over
                (()=>{ let a = stack.pop()
                    let b = stack.pop()
                    if(a===undefined || b===undefined){
                        throw new Error("not enough arguments for over intrinsic")
                    }
                    stack.push(b)
                    stack.push(a)
                    stack.push(b)})()`; break
            case "dup":
                code += `(()=>{let a = stack.pop()
                stack.push(a)
                stack.push(a)})()
`; break
            case "lt":
                code += `stack.push(stack.pop() > stack.pop());`; break
            case "identifier":
                code += "//identifier"
                break;
            //throw new Error(`not implemented identifer with name ${node.value}`)
            default:
                throw new Error(`unhandled case in genCode ${JSON.stringify(node)}`)
        }
        return code
    }).join(";\n")
}

function genCode(ast: AST): string {
    const main = genCodeAux(ast);
    const header = `let stack = [];\n`
    return header + main;
}
function main() {
    const prog =
        `1 while dup 100 < do dup print 1 + end`
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