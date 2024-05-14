import { Question } from "../core/QuestionType"

export type QSEvent = "select-request" | "hide" | "manage-question"
export type QSData = undefined
export type TQuestioSelect = {
    on: (event: QSEvent, callback: (data: QSData) => void) => void,
    render: () => void,
    showQuestion: (question: Question) => void,
    show(): void,
    hide(): void
}