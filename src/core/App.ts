import { QMDataAdd, QMDataId, QMDataIdValue, TQuestionManager } from "../ports/TQuestionManager";
import { TQuestioSelect } from "../ports/TQuestionSelect";
import { QuestionList } from "./QuestionList";

export class App{
    private questionList: QuestionList
    private autoCount: number

    constructor(questionSelect: TQuestioSelect, questionManager: TQuestionManager){
        this.autoCount = 0

        this.questionList = new QuestionList()
        
        questionManager.on('add', data => {
            const addData = data as QMDataAdd
            this.questionList.add(
                this.questionList.make(addData.name, this.autoCount.toString())
            )
            this.autoCount++
            console.log("nadksjd")
            questionManager.render(this.questionList.list())
        })

        questionManager.on('remove', data => {
            const removeData = data as QMDataId
            this.questionList.remove(removeData.questionId)
            questionManager.render(this.questionList.list())
        })
        questionManager.on('select', data => {
            const idData = data as QMDataId
            this.questionList.toggleSelect(idData.questionId)
            questionManager.render(this.questionList.list())
        })

        questionManager.on('change-name', data => {
            const changeData = data as QMDataIdValue
            this.questionList.changeName(changeData.questionId, changeData.value)
            questionManager.render(this.questionList.list())
        })

        questionManager.on('change-mark', data => {
            const changeData = data as QMDataIdValue
            this.questionList.changeMark(changeData.questionId, changeData.value)
            questionManager.render(this.questionList.list())
        })

        questionManager.on('initialized', () => {
            questionManager.render(this.questionList.list())
        })

        questionManager.on('select-request', () => {
            questionManager.hide()
            questionSelect.show()
        })
        questionSelect.on('manage-question', () => {
            questionSelect.hide()
            questionManager.show()
        })
        questionSelect.on('select-request', () => {
            questionSelect.showQuestion(this.questionList.get())
        })
    }
}