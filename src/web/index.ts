import { captureEval, main } from "../index"

const input = document.getElementById("editing") as HTMLInputElement
const output = document.getElementById("output") as HTMLDivElement
const outputjs = document.getElementById("outputjs") as HTMLDivElement

const run = document.getElementById("run") as HTMLButtonElement
const autorun = document.getElementById("autorun") as HTMLInputElement
const select = document.getElementById("select") as HTMLSelectElement
const highlighter = document.querySelector("#highlighting-content") as HTMLPreElement;
const update = function (_text: string) {
    let result_element = document.querySelector("#highlighting-content") as HTMLElement;
    // Handle final newlines (see article)
    // if (text[text.length - 1] == "\n") {
    //     text += " ";
    // }
    // Update code
    // result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    //@ts-ignore
    Prism.highlightElement(result_element);
}
//@ts-ignore
window.update = update;
//@ts-ignore
window.sync_scroll = function (element: HTMLElement) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting") as HTMLElement;
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}
let string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

//@ts-ignore
Prism.languages.porth = {
    comment: /\/\/[^\n]*/,

    // 'comment': /\/\*[\s\S]*?\*\//,
    string_literal: {
        pattern: string,
        greedy: true
    }, ///"(?:[^\n\\"]|\\["\\ntbfr])*"/,
    number_literal: /[0-9]+(?:\.[0-9]+)?/,
    ws: /[ \t]+/,
    nl: /[\n\s]/,
    intrinsic: /\+|\-|\*|divmod|max|print|over|swap|dup|mod|drop|!8|@8|!16|@16|!64|@64|shl|shr|or|and|!=|not|rot|!32|@32|here|stop|>=|<=|!=|!|cast\(ptr\)|cast\(bool\)|cast\(int\)|\=|\>|\</,
    keyword: /if|if\*|else|while|do|include|memory|proc|const|end|offset|reset|in/,
    identifier: /[^\s \t]+/,

}

//@ts-ignore
window.check_tab = function (element: HTMLTextAreaElement, event: KeyboardEvent) {
    let code = element.value;
    if (event.key == "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, element.selectionStart); // text before tab
        let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
    }
}
select.onchange = async () => {
    console.log("getting example")
    const req = await fetch(`examples/${select.value}`)
    const text = await req.text()
    input.value = text;
    set();
    inputChange()
}


const set = async () => {
    console.log("input changed")
    const jscode = await main(input.value)
    outputjs.innerText = jscode
    output.innerText = captureEval(jscode)

}
run.onclick = () => {
    set()
}
const inputChange = () => {
    highlighter.innerHTML = input.value
    //@ts-ignore
    Prism.highlightElement(highlighter)
    if (autorun.checked) {
        set()
    }
}
autorun.onchange = () => {
    set()
}
input.onchange = () => {
    inputChange()
}
input.oninput = () => {
    inputChange()
}
set()

console.log("build loaded")