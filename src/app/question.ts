import { Choice } from "./choice";

export class Question{
    id: number;
    text: string;
    choices: Choice[];
    answer: Choice;
}