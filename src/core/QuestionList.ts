import { Question, QuestionId } from "./QuestionType";

export class QuestionList {
    questions: Question[]

    constructor(){
        this.questions = []
    }

    add(question: Question){
        this.questions.push(question)
    }

    get(){
        const freeQuestions = this.questions.filter(q => !q.selected)
        const question = freeQuestions[
            Math.floor(Math.random()*freeQuestions.length)
        ]
        
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
            id: crypto.randomUUID(),
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
}