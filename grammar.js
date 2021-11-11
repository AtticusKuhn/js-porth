// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const { lexer } = require("./dist/lexer")

function tokenStart(token) {
    return {
        line: token.line,
        col: token.col - 1
    };
}

function tokenEnd(token) {
    const lastNewLine = token.text.lastIndexOf("\n");
    if (lastNewLine !== -1) {
        throw new Error("Unsupported case: token with line breaks");
    }
    return {
        line: token.line,
        col: token.col + token.text.length - 1
    };
}

function convertToken(token) {
    return {
        type: token.type,
        value: token.value,
        start: tokenStart(token),
        end: tokenEnd(token)
    };
}

function convertTokenId(data) {
    return convertToken(data[0]);
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": id},
    {"name": "statements", "symbols": ["statement", "_ml", "statements"], "postprocess": (d)=>[d[0], ...d[2]]},
    {"name": "statements", "symbols": ["statement"], "postprocess": (d)=>d},
    {"name": "statement", "symbols": ["number"], "postprocess": id},
    {"name": "statement", "symbols": ["intrinsic"], "postprocess": id},
    {"name": "statement", "symbols": ["identifier"], "postprocess": id},
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": convertTokenId},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": convertTokenId},
    {"name": "number", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("print") ? {type: "print"} : print)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("timed") ? {type: "timed"} : timed)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("divmod") ? {type: "divmod"} : divmod)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("max") ? {type: "max"} : max)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("gt") ? {type: "gt"} : gt)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("lt") ? {type: "lt"} : lt)], "postprocess": convertTokenId},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": convertTokenId},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "multi_line_ws_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "multi_line_ws_char", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "multi_line_ws_char", "symbols": [{"literal":"\n"}]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
