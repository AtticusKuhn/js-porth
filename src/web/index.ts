import { captureEval, main } from "../index"

const input = document.getElementById("input") as HTMLInputElement
const output = document.getElementById("output") as HTMLDivElement
const outputjs = document.getElementById("outputjs") as HTMLDivElement

const run = document.getElementById("run") as HTMLButtonElement
const autorun = document.getElementById("autorun") as HTMLInputElement

const set = async () => {
    console.log("input changed")
    const jscode = await main(input.value)
    outputjs.innerText = jscode
    output.innerText = captureEval(jscode)

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