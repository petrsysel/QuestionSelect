export type Question = {
    name: string,
    marking: string,
    selected: boolean,
    id: QuestionId
}

export type QuestionId = string