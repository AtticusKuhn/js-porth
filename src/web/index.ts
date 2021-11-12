import { main } from "../index"

const input = document.getElementById("input") as HTMLInputElement
const output = document.getElementById("output") as HTMLDivElement
const run = document.getElementById("run") as HTMLButtonElement
const autorun = document.getElementById("autorun") as HTMLInputElement

const set = async () => {
    console.log("input changed")
    output.innerText = await main(input.value)
}
run.onclick = () => {
    set()
}
input.onchange = () => {
    if (autorun.checked) {

        set()
    }
}
input.oninput = () => {
    if (autorun.checked) {
        set()
    }
}
set()

console.log("build loaded")