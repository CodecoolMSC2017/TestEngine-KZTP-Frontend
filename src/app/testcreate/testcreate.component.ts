import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { Question } from '../question';
import { Choice } from '../choice';

@Component({
  selector: 'app-testcreate',
  templateUrl: './testcreate.component.html',
  styleUrls: ['./testcreate.component.css']
})
export class TestcreateComponent implements OnInit {
  test: Test = new Test;
  questions: Array<Question> = new Array;
  choices: Array<Choice> = new Array;
  currentQuestion: Question = new Question;
  currentChoice: Choice = new Choice;

  constructor() { }

  ngOnInit() {
  }
  private addToChoices(choice: Choice){
    this.choices.push(choice);
  }
  createQuestion(){
    let question: Question = new Question;
    question.id = this.questions.length+1;
    question.text = this.currentQuestion.text;
    question.choices = this.choices;
    question.answer = this.currentQuestion.answer;
    this.addToQuestions(question);
    this.choices = new Array;
  }
  createChoice(){
    let choice: Choice = new Choice;
    choice.text = this.currentChoice.text;
    console.log(this.currentChoice.text);
    this.addToChoices(choice);
  }
  private addToQuestions(question: Question){
    console.log(this.currentQuestion.text);
    this.questions.push(question);
  }

}
