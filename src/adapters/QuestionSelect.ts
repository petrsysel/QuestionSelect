import { Ajax, DomHelper, Signal } from "easybox";
import { Question } from "../core/QuestionType";
import { QSData, QSEvent, TQuestioSelect } from "../ports/TQuestionSelect";

export class QuestionSelect implements TQuestioSelect{
    private signal = new Signal<QSEvent, QSData>()

    //@ts-ignore
    private element: HTMLElement
    //@ts-ignore
    private hiddenMenu: HTMLElement
    //@ts-ignore
    private hiddenReset: HTMLElement
    //@ts-ignore
    private goodluckLabel: HTMLElement
    //@ts-ignore
    private questionLabel: HTMLElement
    //@ts-ignore
    private pickButton: HTMLElement
    //@ts-ignore
    private selectedQLabel: HTMLElement
    //@ts-ignore
    private goodLuck: HTMLElement

    constructor(){
        Ajax.load("templates/QuestionSelect.html").then(template => {
            // this.element = DomHelper.makeDivWith(template)
            this.element = DomHelper.makeDivWith(template)
            DomHelper.appentToBody(this.element)
            
            this.pickButton = document.getElementsByClassName('pick-btn')[0] as HTMLElement
            this.selectedQLabel = document.getElementsByClassName('q-selected')[0] as HTMLElement
            this.goodLuck = document.getElementsByClassName('q-good-luck')[0] as HTMLElement
            this.hiddenMenu = document.getElementsByClassName('hidden-menu')[0] as HTMLElement
            this.hiddenReset = document.getElementsByClassName('hidden-reset')[0] as HTMLElement

            this.reset()
            this.pickButton.addEventListener('click', () => {
                this.signal.emit('select-request', undefined)
                console.log(this.pickButton.classList.toString())
                this.pickButton.classList.add('fade-out')
                this.pickButton.addEventListener('transitionend', () => {
                    this.buttonHide()
                    this.goodLuck.style.display = 'block'
                    this.selectedQLabel.style.display = 'block'

                    setTimeout(() => {
                        this.selectedQLabel.classList.add('fade-in')
                        this.selectedQLabel.addEventListener('transitionend', () => {
                            this.goodLuck.classList.add('fade-in')
                        })
                    },10)
                })

            })

            this.hiddenMenu.addEventListener('click', () => {
                this.signal.emit('manage-question', undefined)
            })
            this.hiddenReset.addEventListener('click', () => {
                this.reset()
            })
        })
        
    }

    private reset(){
        this.pickButton.style.display = 'block'
        
        this.pickButton.classList.add('transition-off')
        this.goodLuck.classList.add('transition-off')
        this.selectedQLabel.classList.add('transition-off')

        this.pickButton.classList.remove('fade-out')
        this.goodLuck.classList.remove('fade-in')
        this.selectedQLabel.classList.remove('fade-in')

        this.goodLuck.style.display = 'none'
        this.selectedQLabel.style.display = 'none'

        setTimeout(() => {
            this.pickButton.classList.remove('transition-off')
        this.goodLuck.classList.remove('transition-off')
        this.selectedQLabel.classList.remove('transition-off')
        },10)


        

    }
    private buttonHide(){
        this.pickButton.style.display = 'none'
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
        
        this.selectedQLabel.innerHTML = question ? question.name : "Otázky vyčerpány"
        // this.questionLabel.style.opacity = '1'
    }
    hide(){
        this.element.style.display = 'none'
    }
    show(){
        this.element.style.display = 'block'
    }
}