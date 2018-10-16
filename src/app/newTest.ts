import { Question } from "./question";

export class NewTest{
    title: string;
    description: string;
    price: number;
    maxPoints: number;
    questions: Question[];
    type: string;
}