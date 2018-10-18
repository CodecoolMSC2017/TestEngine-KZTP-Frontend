import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { Question } from '../question';
import { Choice } from '../choice';
import { NewTest } from '../newTest';
import { TestService } from '../test.service';

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

  questionError: string;
  choiceError: string;
  testError: string;

  showQuestionError: boolean = false;
  showChoiceError: boolean = false;
  showTestError: boolean = false;

  constructor(private testService: TestService) { }

  ngOnInit() {
  }
  private addToChoices(choice: Choice){
    if(choice.text == undefined){
        this.choiceError = "Please fill the fields!"
        this.showChoiceError = true;
      return;
    }
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
    this.emptyChoice();
    this.emptyQuestion();

  }
  createChoice(){
    let choice: Choice = new Choice;
    choice.text = this.currentChoice.text;
    this.addToChoices(choice);
    this.emptyChoice();
  }
  createTest(){
    let newTest: NewTest = new NewTest;
    newTest.description = this.test.description;
    newTest.price = this.test.price;
    newTest.questions = this.questions;
    newTest.title = this.test.title;
    newTest.type = this.test.type;
    if(newTest.title == undefined || newTest.description == undefined || newTest.price < 0 || 
    newTest.questions.length == 0 || newTest.title == undefined || newTest.type == undefined){
      this.testError = "Please fill the fields"
      this.showTestError = true;
      return;
    }

    this.testService.createTest(newTest).subscribe();
    this.emptyTest();
  }
  private addToQuestions(question: Question){
    if(question.answer == null || question.choices.length == 0 || question.text == undefined){
      this.questionError = "Please fill the fields";
      this.showQuestionError = true;
      return;
    }
    this.questions.push(question);
  }
  private emptyChoice(){
    this.currentChoice = new Choice;
  }
  private emptyQuestion(){
    this.currentQuestion.text = null;
    this.currentQuestion = new Question;
  }
  private emptyTest(){
    this.test = new Test;
    this.questions = new Array;
    this.choices = new Array;
    this.currentQuestion = new Question;
    this.currentChoice = new Choice;

    this.showQuestionError = false;
    this.showChoiceError = false;
    this.showTestError= false;
  }

}
