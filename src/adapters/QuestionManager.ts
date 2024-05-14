import { Ajax, DomHelper, Signal } from "easybox";
import { Question } from "../core/QuestionType";
import { QMData, QMDataAdd, QMEvent, TQuestionManager } from "../ports/TQuestionManager";

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
    tableElement: HTMLTableElement
    //@ts-ignore
    selectbutton: HTMLButtonElement

    constructor(){
        this.signal = new Signal()
        this.element = DomHelper.makeDiv()
        

        Ajax.load('templates/QuestionManager.html').then(template => {
            this.element.innerHTML = template
            console.log(template)
            DomHelper.appentToBody(this.element)

            this.container = DomHelper.get('questions-container') as HTMLElement

            this.nameInput = DomHelper.get('question-name') as HTMLInputElement
            this.inputButton = DomHelper.get('add-question') as HTMLButtonElement
            this.tableElement = DomHelper.get('question-list') as HTMLTableElement
            this.selectbutton = DomHelper.get('select-btn') as HTMLButtonElement

            this.inputButton.addEventListener('click', () => {
                this.signal.emit('add', {
                    name: this.nameInput.value
                } as QMDataAdd)
                this.nameInput.value = ""
            })

            this.selectbutton.addEventListener('click', () => {
                this.emit('select-request', undefined)
            })

            this.emit('initialized', undefined)
        })
    }

    on(event: QMEvent, callback: (data: QMData) => void): void {
        this.signal.on(event, callback)
    }
    render(questions: Question[]): void {
        this.tableElement.innerHTML = ""

        const headMark = DomHelper.make('th')
        headMark.innerHTML = "Číslo"
        const headName = DomHelper.make('th')
        headName.innerHTML = "Otázka"
        const headSelect = DomHelper.make('th')
        headSelect.innerHTML = "K dispozici"
        const trh = DomHelper.make('tr')

        trh.appendChild(headMark)
        trh.appendChild(headName)
        trh.appendChild(headSelect)
        this.tableElement.appendChild(trh)

        headMark.addEventListener('click', () => {
            this.render(questions.sort((a, b) =>{
                if(a.marking > b.marking) return 1
                else if(a.marking < b.marking) return -1
                else return 0
            }))
        })
        headName.addEventListener('click', () => {
            this.render(questions.sort((a, b) =>{
                if(a.name > b.name) return 1
                else if(a.name < b.name) return -1
                else return 0
            }))
        })
        headSelect.addEventListener('click', () => {
            this.render(questions.sort((a, b) =>{
                if(a.selected > b.selected) return 1
                else if(a.selected < b.selected) return -1
                else return 0
            }))
        })

        questions.forEach(q => {
            const tr = DomHelper.make('tr')
            const mark = DomHelper.make('td')
            const name = DomHelper.make('td')
            const selected = DomHelper.make('td')
            const deleteBtn = DomHelper.make('td')

            const markInput = DomHelper.make('input') as HTMLInputElement
            const nameInput = DomHelper.make('input') as HTMLInputElement
            const selectBox = DomHelper.make('input') as HTMLInputElement
            const delBtn = DomHelper.make('button') as HTMLButtonElement

            markInput.classList.add('mark-input')
            nameInput.classList.add('name-input')
            selected.classList.add('select-input')

            markInput.value = q.marking
            nameInput.value = q.name
            selectBox.checked = !q.selected
            selectBox.type = 'checkbox'
            delBtn.innerHTML = "Odstranit"

            mark.appendChild(markInput)
            name.appendChild(nameInput)
            selected.appendChild(selectBox)
            deleteBtn.appendChild(delBtn)

            tr.appendChild(mark)
            tr.appendChild(name)
            tr.appendChild(selected)
            tr.appendChild(deleteBtn)

            delBtn.addEventListener('click', () => {
                this.emit('remove', {
                    questionId: q.id
                })
            })
            selectBox.addEventListener('click', () => {
                this.emit('select', {
                    questionId: q.id
                })
            })
            markInput.addEventListener('change', () => {
                this.emit('change-mark', {
                    questionId: q.id,
                    value: markInput.value
                })
            })
            nameInput.addEventListener('change', () => {
                this.emit('change-name', {
                    questionId: q.id,
                    value: nameInput.value
                })
            })

            this.tableElement.appendChild(tr)
        })
    }
    private emit(event: QMEvent, data: QMData){
        this.signal.emit(event, data)
    }
    show(): void {
        this.container.style.left = '0'
    }
    hide(): void {
        // this.container.classList.add('slide')
        this.container.style.left = '-100vw'
        // console.log("slide")
    }
}