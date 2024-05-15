import { randomUUID } from "crypto";
import { Question, QuestionId } from "./QuestionType";

type SerializedQ = {
    questions: Question[],
    autoincrement: number
}

export class QuestionList {
    questions: Question[]
    autoIncrement: number

    constructor(){
        this.questions = []
        this.autoIncrement = 1
    }

    add(question: string){
        const q = this.make(question, this.autoIncrement.toString())
        this.questions.push(q)
        this.autoIncrement++
    }

    get(){
        const freeQuestions = this.questions.filter(q => !q.selected)
        const question = freeQuestions[
            Math.floor(Math.random()*freeQuestions.length)
        ]
        if(question) question.selected = true
        
        return question
    }
    select(id: QuestionId){
        const question = this.questions.find(q => q.id == id)
        if(question) question.selected = true
    }
    unselect(id: QuestionId){
        const question = this.questions.find(q => q.id == id)
        if(question) question.selected = false
    }
    remove(id: QuestionId){
        const question = this.questions.findIndex(q => q.id == id)
        if(question >= 0){
            this.questions.splice(question, 1)
        }
    }
    make(name: string, mark: string): Question{
        return {
            name: name,
            marking: mark,
            id: randomUUID(),
            selected: false
        }
    }
    changeName(id: QuestionId, name: string){
        const question = this.questions.find(q => q.id == id)
        if(question) question.name = name
    }
    changeMark(id: QuestionId, mark: string){
        const question = this.questions.find(q => q.id == id)
        if(question) question.marking = mark
    }

    list(){
        return this.questions
    }
    toggleSelect(id: QuestionId){
        const question = this.questions.find(q => q.id == id)
        if(question) question.selected = !question.selected
    }

    save(){
        const toSave: SerializedQ = {
            autoincrement: this.autoIncrement,
            questions: this.questions
        }
        localStorage.setItem('questions', JSON.stringify(toSave))
    }
    load(){
        const loaded = localStorage.getItem('questions')
        if(!loaded) return false
        const deserialized: SerializedQ = JSON.parse(loaded)
        this.autoIncrement = deserialized.autoincrement
        this.questions = deserialized.questions
    }
    reset(){
        this.autoIncrement = 1
        this.questions = []
    }
    markAsWaiting(){
        this.questions.forEach(q => q.selected = false)
    }
    export(){
        const toExport: SerializedQ = {
            autoincrement: this.autoIncrement,
            questions: this.questions
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(toExport))
        const dlAnchorElem = document.createElement('a')
        dlAnchorElem.setAttribute("href",dataStr)
        dlAnchorElem.setAttribute("download", "questions.json")
        dlAnchorElem.click();
    }
    import(): Promise<void>{
        return new Promise((resolve, reject) => {
            const importData = () => {
                let input = document.createElement('input') as HTMLInputElement
                input.type = 'file';
                input.accept = '.json'
                input.onchange = () => {
                    if(!input.files) return
                    let file = input.files[0]
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        if(e.target?.result){
                            const result = e.target.result as string
                            const resultObj = JSON.parse(result)
                            const loaded: SerializedQ = {
                                autoincrement: resultObj.autoincrement,
                                questions:resultObj.questions
                            }
                            this.autoIncrement = loaded.autoincrement
                            this.questions = loaded.questions
                        }
                        resolve()
                    }
                    reader.readAsText(file)
                }
                input.click()
                
            }
            importData()
        })
    }
}