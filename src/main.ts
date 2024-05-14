import { QuestionManager } from "./adapters/QuestionManager"
import { QuestionSelect } from "./adapters/QuestionSelect"
import { App } from "./core/App"

function main(){
    const questionManager = new QuestionManager()
    const questionSelect = new QuestionSelect()

    const app = new App(questionSelect, questionManager)
}

window.addEventListener('load', () => {
    main()
})