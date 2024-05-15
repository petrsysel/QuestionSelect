import { Menu } from "../adapters/Menu";
import { QMDataAdd, QMDataId, QMDataIdValue, TQuestionManager } from "../ports/TQuestionManager";
import { TQuestioSelect } from "../ports/TQuestionSelect";
import { QuestionList } from "./QuestionList";

export class App{
    private questionList: QuestionList

    constructor(questionSelect: TQuestioSelect, questionManager: TQuestionManager, menu: Menu){
        this.questionList = new QuestionList()
        this.questionList.load()

        const onChange = () => {
            this.questionList.save()
        }
        
        questionManager.on('add', data => {
            console.log("added")
            const addData = data as QMDataAdd
            this.questionList.add(addData.name)
            questionManager.render(this.questionList.list())
            onChange()
        })

        questionManager.on('remove', data => {
            const removeData = data as QMDataId
            this.questionList.remove(removeData.questionId)
            questionManager.render(this.questionList.list())
            onChange()
        })
        questionManager.on('select', data => {
            const idData = data as QMDataId
            this.questionList.toggleSelect(idData.questionId)
            questionManager.render(this.questionList.list())
            onChange()
        })

        questionManager.on('change-name', data => {
            const changeData = data as QMDataIdValue
            this.questionList.changeName(changeData.questionId, changeData.value)
            questionManager.render(this.questionList.list())
            onChange()
        })

        questionManager.on('change-mark', data => {
            const changeData = data as QMDataIdValue
            this.questionList.changeMark(changeData.questionId, changeData.value)
            questionManager.render(this.questionList.list())
            onChange()
        })



        questionManager.on('initialized', () => {
            questionManager.render(this.questionList.list())
            menu.init()
            questionManager.hide()
            menu.on('remove-all', () => {
                this.questionList.reset()
                questionManager.render(this.questionList.list())
            })
            menu.on('mark-as-waiting', () => {
                this.questionList.markAsWaiting()
                questionManager.render(this.questionList.list())
            })
            menu.on('export', () => {
                this.questionList.export()
                questionManager.render(this.questionList.list())
            })
            menu.on('import', async () => {
                await this.questionList.import()
                questionManager.render(this.questionList.list())
            })
            menu.on('picking', async () => {
                questionManager.hide()
                questionSelect.show()
            })
        })

        questionManager.on('select-request', () => {
            questionManager.hide()
            questionSelect.show()
        })
        questionSelect.on('manage-question', () => {
            questionSelect.hide()
            questionManager.show()
            questionManager.render(this.questionList.list())
        })
        questionSelect.on('select-request', () => {
            questionSelect.showQuestion(this.questionList.get())
            this.questionList.save()
        })
    }
}