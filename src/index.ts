import nearley from "nearley"
import lexer from "./lexer";
import fs from "fs"
//@ts-ignore
const grammar = require("../grammar.js")
// Create a Parser object from our grammar.
const sampleCode = (`1 2 + print`);
const lexed = lexer.reset(sampleCode)
while (true) {
    const tok = lexed.next()
    if (!tok) {
        break
    } else {
        console.log(tok.type)
    }
}
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
    | { type: 'identifier', value: string } & loc

type AST = Node[];
function parse(code: string): either<string, AST> {
    // Parse something!
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    if (parser.results.length > 1) {
        return left("ambiguos parser")
    }
    return right(parser.results[0])

}
function genCode(ast: AST): string {
    const main = ast.map((node: Node) => {
        let code = ""
        switch (node.type) {
            case "number_literal":
                code += `stack.push(${node.value})`
                break;
            case "plus":
                code += `stack.push(stack.pop() + stack.pop())`
                break;
            case "print":
                code += `console.log(stack.pop())`
                break
            case "identifier":
                throw new Error(`not implemented`)
            default:
                throw new Error(`unhandled case in genCode ${JSON.stringify(node)}`)
        }
        return code
    }).join(";\n")
    const header = `let stack = [];\n`
    return header + main;

}
function main() {
    const prog = `1 2 + print`
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