import { Question, QuestionId } from "../core/QuestionType"

export type QMEvent = "remove" | "add" | "change-mark" | "change-name" | "select" | "initialized" | "select-request"
export type QMDataAdd = {
    questionId: QuestionId,
    name: string
}
export type QMDataId = {
    questionId: QuestionId
}
export type QMDataIdValue = {
    questionId: QuestionId,
    value: string
}
export type QMData = QMDataAdd | QMDataId | QMDataIdValue | undefined

export type TQuestionManager = {
    render(questions: Question[]): void
    on(event: QMEvent, callback: (data: QMData) => void): void
    show(): void
    hide(): void
}