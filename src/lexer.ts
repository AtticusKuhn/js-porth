import moo from "moo"
export const lexer = moo.compile({
    ws: /[ \t]+/,
    nl: { match: /[\n\s]/, lineBreaks: true },
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
        match: /\/\/[^\n]*/,
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
        match: /\+|\-|\*|divmod|max|print|over|swap|dup|mod|drop|!8|@8|!16|@16|!64|@64|shl|shr|or|and|ge|le|ne|not|rot|!32|@32|here|stop|>=|<=|!=|!|cast\(ptr\)|cast\(bool\)|cast\(int\)|\=|\>|\</,
        type: moo.keywords({
            plus: "+",
            minus: "-",
            times: "*",
            divmod: "divmod",
            max: "max",
            mod: "mod",
            print: "print",
            eq: "=",
            gt: ">",
            lt: "<",
            over: "over",
            swap: "swap",
            dup: "dup",
            drop: "drop",
            store8: "!8",
            load8: "@8",
            store16: "!16",
            load16: "@16",
            store64: "!64",
            load64: "@64",
            shl: "shl",
            shr: "shr",
            or: "or",
            and: "and",
            ge: ">=",
            le: "<=",
            ne: "!=",
            not: "!",
            rot: "rot",
            load32: "@32",
            store32: "!32",
            cast_ptr: "cast(ptr)",
            cast_int: "cast(int)",
            cast_bool: "cast(bool)",
            here: "here",
            stop: "stop",
        })
    },
    identifier: {
        match: /[^\s \t]+/,
        type: moo.keywords({
            ifStatement: "if",
            elseStatement: "else",
            whileStatement: "while",
            doStatement: "do",
            include: "include",
            memory: "memory",
            proc: "proc",
            constStatement: "const",
            end: "end",
            offset: 'offset',
            reset: "reset",
            assert: "assert",
            in: "in",
        })
    },

});

export default lexer

