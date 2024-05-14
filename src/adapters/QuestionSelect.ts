import { Ajax, DomHelper, Signal } from "easybox";
import { Question } from "../core/QuestionType";
import { QSData, QSEvent, TQuestioSelect } from "../ports/TQuestionSelect";

export class QuestionSelect implements TQuestioSelect{
    private signal = new Signal<QSEvent, QSData>()

    //@ts-ignore
    private element: HTMLElement
    //@ts-ignore
    private invisibleButton: HTMLElement
    //@ts-ignore
    private selectButton: HTMLButtonElement
    //@ts-ignore
    private goodluckLabel: HTMLElement
    //@ts-ignore
    private questionLabel: HTMLElement

    constructor(){
        Ajax.load("templates/QuestionSelect.html").then(template => {
            this.element = DomHelper.makeDivWith(template)
            DomHelper.appentToBody(this.element)
            this.element.classList.add('select-container')

            this.invisibleButton = DomHelper.get('manage-questions-btn') as HTMLElement
            this.selectButton = DomHelper.get('select-question-button') as HTMLButtonElement

            this.goodluckLabel = DomHelper.get('good-luck-label') as HTMLButtonElement
            this.questionLabel = DomHelper.get('question-selected-label') as HTMLButtonElement
            console.log(this.questionLabel)

            this.invisibleButton.addEventListener('click', () => {
                this.emit('manage-question', undefined)
            })
            this.selectButton.addEventListener('click', () => {
                this.emit('select-request', undefined)
            })
        })
        
    }

    private emit(event: QSEvent, data: QSData){
        this.signal.emit(event, data)
    }
    on(event: QSEvent, callback: (data: undefined) => void){
        this.signal.on(event, callback)
    }
    render(){
        this.goodluckLabel.style.opacity = '1'
        this.questionLabel.style.opacity = '0'
    }
    showQuestion(question: Question){
        this.questionLabel.innerHTML = question.name
        this.questionLabel.style.opacity = '1'
    }
    hide(){
        this.element.style.left = '100vw'
    }
    show(){
        this.element.style.left = '0'
    }
}