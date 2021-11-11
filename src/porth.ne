@{%
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

%}

@lexer lexer

program -> __ml statements __ml {% d=>d[1] %}
statements -> statement _ml statements {%(d)=>[d[0], ...d[2]]%}
    | statement {%(d)=>d%}
statement ->  number  {%id%}
    | intrinsic  {%id%}
    | identifier {%id%}
    | macro {%id%}
    | proc {%id%}
    | memory {%id%}
    | constStatement {%id%}
    | include {%id%}
    | conditional {%id%}
    | whileStatement {%id%}
    | string_literal {%id%}
    | line_comment {%id%}


whileStatement -> %whileStatement _ml statements _ml %doStatement _ml statements _ml %end  {%d=>({
   type:"while",
   condition: d[2],
   body: d[6],
})%}
conditional ->ifStatement {%id%} | ifElse {%id%} 
ifElse -> 
     %ifStatement  _ml statements _ml %elseStatement _ml statements _ml  %end {%d=>({
        type:"ifElse",
        // condition:d[0],
        body:d[2],
        elseBranch:d[6]
    })%}
    |  %ifStatement  _ml statements _ml %elseStatement _ml statements _ml conditional {%d=>({
        type:"ifElse",
        elseCondition: d[6],
        body:d[2],
        elseBranch:[d[8]]
    })%}
ifStatement ->   %ifStatement  _ml statements _ml %end  {%d=>({
    type:"if",
   // condition: d[0],
    body: d[2],
})%}

macro -> %macro _ml identifier _ml  statements _ml %end {%d=>({
    type:"macro",
    name:d[2].value,
    body:d[4]
})%}
memory -> %memory _ml identifier _ml  statements _ml %end {%d=>({
    type:"memory",
    name:d[2].value,
    body:d[4]
})%}
proc -> %proc _ml identifier _ml  statements _ml %end {%d=>({
    type:"proc",
    name:d[2].value,
    body:d[4]
})%}
constStatement -> %constStatement _ml identifier _ml statements _ml %end {%d=>({
    type:"const",
    name:d[2].value,
    body:d[4]
})%}
include -> %include _ml string_literal {%d=>({
    type:"include",
    file:d[2],
})%}

line_comment -> %comment {% convertTokenId %}

string_literal -> %string_literal {% convertTokenId %}

number -> %number_literal {% convertTokenId %}

intrinsic -> %plus {% convertTokenId %}
    |    %print {% convertTokenId %}
    |   %minus {% convertTokenId %}
    |       %timed {% convertTokenId %}
    |      %divmod {% convertTokenId %}
    |      %mod {% convertTokenId %}
    |     %max {% convertTokenId %}
    |   %eq {% convertTokenId %}
    |  %gt {% convertTokenId %}
    | %lt {% convertTokenId %} 
    | %over {% convertTokenId %} 
    | %swap {% convertTokenId %} 
    | %dup {% convertTokenId %} 
    | %drop {% convertTokenId %} 
    | %store8 {% convertTokenId %} 
    | %load8 {% convertTokenId %}
    | %shl {% convertTokenId %} 
    | %shr {% convertTokenId %} 
    | %or {% convertTokenId %} 
    | %and {% convertTokenId %} 


identifier -> %identifier {% convertTokenId %}

__ml -> multi_line_ws_char:*
_ml -> multi_line_ws_char:+

multi_line_ws_char
    -> %ws
    |  "\n"
    | "\t"
    # | %nl

__ -> %ws:+

_ -> %ws:*