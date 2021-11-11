import moo from "moo"
export const lexer = moo.compile({
    ws: /[ \t]+/,
    nl: { match: "\n", lineBreaks: true },
    // lte: "<=",
    // lt: "<",
    // gte: ">=",
    // gt: ">",
    // eq: "==",
    // lparan: "(",
    // rparan: ")",
    // comma: ",",
    // lbracket: "[",
    // rbracket: "]",
    // lbrace: "{",
    // rbrace: "}",
    // assignment: "=",
    // plus: "+",
    // minus: "-",
    // multiply: "*",
    // divide: "/",
    // modulo: "%",
    // colon: ":",
    comment: {
        match: /#[^\n]*/,
        value: s => s.substring(1)
    },
    string_literal: {
        match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
        value: s => JSON.parse(s)
    },
    number_literal: {
        //@ts-ignore
        match: /[0-9]+(?:\.[0-9]+)?/,
        value: s => Number(s)
    },
    intrinsic: {
        match: /\+|\-|\*|divmod|max|print|\=|\>|\</,
        type: moo.keywords({
            plus: "+",
            minus: "-",
            times: "*",
            divmod: "divmod",
            max: "max",
            print: "print",
            eq: "=",
            gt: ">",
            lt: "<",
        })
    },
    identifier: {
        match: /[a-z_][a-z_0-9]*/,
        type: moo.keywords({
            if: "if",
            else: "else",
            while: "while",
            do: "do",
            include: "include",
            memory: "memory",
            proc: "proc",
            const: "const",
            end: "end",
            offset: 'offset',
            reset: "reset",
            assert: "assert",
            in: "in",
        })
    },

});

export default lexer

