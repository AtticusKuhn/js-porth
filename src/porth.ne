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

program -> statements {% id %}
statements -> statement _ml statements {%(d)=>[d[0], ...d[2]]%}
    | statement {%(d)=>d%}
statement ->  number  {%id%}
    | intrinsic  {%id%}
    |identifier {%id%}

line_comment -> %comment {% convertTokenId %}

string_literal -> %string_literal {% convertTokenId %}

number -> %number_literal {% convertTokenId %}

intrinsic -> %plus {% convertTokenId %}
        |    %print {% convertTokenId %}
    | %minus {% convertTokenId %}
     |       %timed {% convertTokenId %}
      |      %divmod {% convertTokenId %}
       |     %max {% convertTokenId %}
         |   %eq {% convertTokenId %}
          |  %gt {% convertTokenId %}
           | %lt {% convertTokenId %} 
identifier -> %identifier {% convertTokenId %}

_ml -> multi_line_ws_char:*

multi_line_ws_char
    -> %ws
    |  "\n"

__ -> %ws:+

_ -> %ws:*