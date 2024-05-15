import { Menu } from "./adapters/Menu"
import { QuestionManager } from "./adapters/QuestionManager"
import { QuestionSelect } from "./adapters/QuestionSelect"
import { App } from "./core/App"

function main(){
    const menu = new Menu()
    const questionManager = new QuestionManager()
    const questionSelect = new QuestionSelect()

    const app = new App(questionSelect, questionManager, menu)
}

window.addEventListener('load', () => {
    main()
})