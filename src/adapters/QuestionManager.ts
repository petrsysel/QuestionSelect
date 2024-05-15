import { Ajax, DomHelper, Signal } from "easybox";
import { Question } from "../core/QuestionType";
import { QMData, QMDataAdd, QMEvent, TQuestionManager } from "../ports/TQuestionManager";
import { Menu } from "./Menu";

export class QuestionManager implements TQuestionManager{
    signal: Signal<QMEvent, QMData>
    element: HTMLElement
    //@ts-ignore
    container: HTMLElement
    //@ts-ignore
    nameInput: HTMLInputElement
    //@ts-ignore
    inputButton: HTMLButtonElement
    //@ts-ignore
    listElement: HTMLDivElement
    //@ts-ignore
    selectbutton: HTMLButtonElement
    //@ts-ignore
    questionTemplate: HTMLElement

    constructor(){
        this.signal = new Signal()
        this.element = DomHelper.makeDiv()
        

        Ajax.load('templates/QuestionManager.html').then(template => {
            this.element.innerHTML = template
            
            DomHelper.appentToBody(this.element)

            this.container = DomHelper.get('questions-container') as HTMLElement

            this.nameInput = DomHelper.get('question-name') as HTMLInputElement
            this.inputButton = DomHelper.get('add-question') as HTMLButtonElement
            this.listElement = DomHelper.get('question-list') as HTMLDivElement
            this.selectbutton = DomHelper.get('select-btn') as HTMLButtonElement
            console.log(this.listElement)
            this.questionTemplate = DomHelper.get('q-template') as HTMLElement
            // this.questionTemplate.style.display = 'none'

            this.inputButton.addEventListener('click', () => {
                console.log(`emmiting ${this.nameInput.value}`)
                this.signal.emit('add', {
                    name: this.nameInput.value
                } as QMDataAdd)
                this.nameInput.value = ""
            })

            this.emit('initialized', undefined)
        })
    }

    on(event: QMEvent, callback: (data: QMData) => void): void {
        this.signal.on(event, callback)
    }
    render(questions: Question[]): void {
        console.log(questions)
        this.listElement.innerHTML = ''

        questions.forEach(q => {
            const question = this.questionTemplate.cloneNode(true) as HTMLElement
            question.getElementsByClassName('q-name')[0].innerHTML = q.name
            // question.style.display = 'initial'
            // this.questionTemplate.style.display = 'none'
            question.id = ''
            //@ts-ignore
            question.getElementsByClassName('q-id')[0].value = q.marking
            const isPickedBtn = question.getElementsByClassName('q-ispicked')[0] as HTMLElement
            isPickedBtn.innerHTML = q.selected ? "Vylosována" : "Čekající"
            isPickedBtn.classList.add(q.selected ? 'q-picked' : 'q-available')
            this.listElement.appendChild(question)
            
            isPickedBtn.addEventListener('click', () => {
                this.signal.emit('select', {
                    questionId: q.id
                })
            })

            const rmBtn = question.getElementsByClassName('q-remove')[0] as HTMLElement
            rmBtn.addEventListener('click', () => {
                this.signal.emit('remove', {
                    questionId: q.id
                })
            })
        })
    }
    private emit(event: QMEvent, data: QMData){
        this.signal.emit(event, data)
    }
    show(): void {
        this.element.style.display = 'block'
    }
    hide(): void {
        // this.container.classList.add('slide')
        this.element.style.display = 'none'
        // console.log("slide")
    }
}