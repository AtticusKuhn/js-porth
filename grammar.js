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
    {"name": "program", "symbols": ["__ml", "statements", "__ml"], "postprocess": d=>d[1]},
    {"name": "statements", "symbols": ["statement", "_ml", "statements"], "postprocess": (d)=>[d[0], ...d[2]]},
    {"name": "statements", "symbols": ["statement"], "postprocess": (d)=>d},
    {"name": "statement", "symbols": ["number"], "postprocess": id},
    {"name": "statement", "symbols": ["intrinsic"], "postprocess": id},
    {"name": "statement", "symbols": ["identifier"], "postprocess": id},
    {"name": "statement", "symbols": ["macro"], "postprocess": id},
    {"name": "statement", "symbols": ["proc"], "postprocess": id},
    {"name": "statement", "symbols": ["memory"], "postprocess": id},
    {"name": "statement", "symbols": ["constStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["include"], "postprocess": id},
    {"name": "statement", "symbols": ["conditional"], "postprocess": id},
    {"name": "statement", "symbols": ["whileStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["string_literal"], "postprocess": id},
    {"name": "statement", "symbols": ["line_comment"], "postprocess": id},
    {"name": "whileStatement", "symbols": [(lexer.has("whileStatement") ? {type: "whileStatement"} : whileStatement), "_ml", "statements", "_ml", (lexer.has("doStatement") ? {type: "doStatement"} : doStatement), "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[6] = d[6].map(x=>Object.assign(x, {inside:"while"}));
            d[2] = d[2].map(x=>Object.assign(x, {inside:"while"}));
            return {
           type:"while",
           condition: d[2],
           body: d[6],
        }}},
    {"name": "conditional", "symbols": ["ifStatement"], "postprocess": id},
    {"name": "conditional", "symbols": ["ifElse"], "postprocess": id},
    {"name": "ifElse", "symbols": [(lexer.has("ifStatement") ? {type: "ifStatement"} : ifStatement), "_ml", "statements", "_ml", (lexer.has("elseStatement") ? {type: "elseStatement"} : elseStatement), "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[6] = d[6].map(x=>Object.assign(x, {inside:"ifElse"}))
            d[2] = d[2].map(x=>Object.assign(x, {inside:"ifElse"}))
            return{
            type:"ifElse",
            // condition:d[0],
            body:d[2],
            elseBranch:d[6]
        }}},
    {"name": "ifElse", "symbols": [(lexer.has("ifStatement") ? {type: "ifStatement"} : ifStatement), "_ml", "statements", "_ml", (lexer.has("elseStatement") ? {type: "elseStatement"} : elseStatement), "_ml", "statements", "_ml", "conditional"], "postprocess": d=>{
            d[6] = d[6].map(x=>Object.assign(x, {inside:"ifElse"}))
            d[2] = d[2].map(x=>Object.assign(x, {inside:"ifElse"}))
            d[8] = d[8].map(x=>Object.assign(x, {inside:"ifElse"}))
            return {
            type:"ifElse",
            elseCondition: d[6],
            body:d[2],
            elseBranch:[d[8]]
        }}},
    {"name": "ifStatement", "symbols": [(lexer.has("ifStatement") ? {type: "ifStatement"} : ifStatement), "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[2] = d[2].map(x=>Object.assign(x, {inside:"if"}))
            return {
            type:"if",
           // condition: d[0],
            body: d[2],
        }}},
    {"name": "macro", "symbols": [(lexer.has("macro") ? {type: "macro"} : macro), "_ml", "identifier", "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>({
            type:"macro",
            name:d[2].value,
            body:d[4]
        })},
    {"name": "memory", "symbols": [(lexer.has("memory") ? {type: "memory"} : memory), "_ml", "identifier", "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[4] = d[4].map(x=>Object.assign(x, {inside:"memory"}))
            return {
            type:"memory",
            name:d[2].value,
            body:d[4]
        }}},
    {"name": "proc", "symbols": [(lexer.has("proc") ? {type: "proc"} : proc), "_ml", "identifier", "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[4] = d[4].map(x=>Object.assign(x, {inside:"proc"}))
            return {
            type:"proc",
            name:d[2].value,
            body:d[4]
        }}},
    {"name": "constStatement", "symbols": [(lexer.has("constStatement") ? {type: "constStatement"} : constStatement), "_ml", "identifier", "_ml", "statements", "_ml", (lexer.has("end") ? {type: "end"} : end)], "postprocess": d=>{
            d[4] = d[4].map(x=>Object.assign(x, {inside:"const"}))
            return {
            type:"const",
            name:d[2].value,
            body:d[4]
        }}},
    {"name": "include", "symbols": [(lexer.has("include") ? {type: "include"} : include), "_ml", "string_literal"], "postprocess": d=>({
            type:"include",
            file:d[2],
        })},
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": convertTokenId},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": convertTokenId},
    {"name": "number", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("print") ? {type: "print"} : print)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("times") ? {type: "times"} : times)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("timed") ? {type: "timed"} : timed)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("divmod") ? {type: "divmod"} : divmod)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("mod") ? {type: "mod"} : mod)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("max") ? {type: "max"} : max)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("gt") ? {type: "gt"} : gt)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("lt") ? {type: "lt"} : lt)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("over") ? {type: "over"} : over)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("swap") ? {type: "swap"} : swap)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("dup") ? {type: "dup"} : dup)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("drop") ? {type: "drop"} : drop)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("store8") ? {type: "store8"} : store8)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("load8") ? {type: "load8"} : load8)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("store16") ? {type: "store16"} : store16)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("load16") ? {type: "load16"} : load16)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("store64") ? {type: "store64"} : store64)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("load64") ? {type: "load64"} : load64)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("shl") ? {type: "shl"} : shl)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("shr") ? {type: "shr"} : shr)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("or") ? {type: "or"} : or)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("and") ? {type: "and"} : and)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("ge") ? {type: "ge"} : ge)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("le") ? {type: "le"} : le)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("ne") ? {type: "ne"} : ne)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("not") ? {type: "not"} : not)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("rot") ? {type: "rot"} : rot)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("load32") ? {type: "load32"} : load32)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("store32") ? {type: "store32"} : store32)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("cast_ptr") ? {type: "cast_ptr"} : cast_ptr)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("cast_int") ? {type: "cast_int"} : cast_int)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("cast_bool") ? {type: "cast_bool"} : cast_bool)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("here") ? {type: "here"} : here)], "postprocess": convertTokenId},
    {"name": "intrinsic", "symbols": [(lexer.has("stop") ? {type: "stop"} : stop)], "postprocess": convertTokenId},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": convertTokenId},
    {"name": "__ml$ebnf$1", "symbols": []},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "multi_line_ws_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_ml$ebnf$1", "symbols": ["multi_line_ws_char"]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "multi_line_ws_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "multi_line_ws_char", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "multi_line_ws_char", "symbols": [{"literal":"\n"}]},
    {"name": "multi_line_ws_char", "symbols": [{"literal":"\t"}]},
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
