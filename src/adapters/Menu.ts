import { DomHelper, Signal } from "easybox"
export type MenuEvent = 'remove-all' | 'mark-as-waiting' | 'export' | 'import' | 'picking'
export class Menu{
    //@ts-ignore
    hamburger: HTMLElement
    //@ts-ignore
    controls: HTMLElement

    signal: Signal<MenuEvent, undefined>

    constructor(){
        this.signal = new Signal()
    }

    on(event: MenuEvent, callback: () => void){
        this.signal.on(event, callback)
    }

    init(){
        this.hamburger = document.getElementsByClassName('q-hamburger')[0] as HTMLElement
        this.controls = document.getElementsByClassName('q-controls')[0] as HTMLElement

        this.hamburger.addEventListener('click', () => {
            const display = this.controls.style.display
            this.controls.style.display = display === 'flex'? 'none': 'flex'
        })

        const about = this.controls.getElementsByClassName('q-about')[0]
        const removeAll = this.controls.getElementsByClassName('q-remove-all')[0]
        const markAsWaiting = this.controls.getElementsByClassName('q-mark-as-waiting')[0]
        const exportQuestions = this.controls.getElementsByClassName('q-export')[0]
        const importQuestions = this.controls.getElementsByClassName('q-import')[0]
        const picking = this.controls.getElementsByClassName('q-picking')[0]

        removeAll.addEventListener('click', () => {
            this.signal.emit('remove-all', undefined)
        })
        markAsWaiting.addEventListener('click', () => {
            this.signal.emit('mark-as-waiting', undefined)
        })
        exportQuestions.addEventListener('click', () => {
            this.signal.emit('export', undefined)
        })
        importQuestions.addEventListener('click', () => {
            this.signal.emit('import', undefined)
        })
        picking.addEventListener('click', () => {
            this.signal.emit('picking', undefined)
        })
        about.addEventListener('click', () => {
            const anchor = document.createElement('a')
            anchor.href = 'https://github.com/petrsysel/QuestionSelect'
            anchor.target = '_blank'
            anchor.click()
        })
    }
}