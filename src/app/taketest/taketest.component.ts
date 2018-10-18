import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { UserSolution } from '../usersolution';
import { Solution } from '../solution';
import { TestResult } from '../testresult';

@Component({
  selector: 'app-taketest',
  templateUrl: './taketest.component.html',
  styleUrls: ['./taketest.component.css']
})
export class TaketestComponent implements OnInit {

  test: Test;
  testId: number;
  questions: Question[];
  solutions: Array<Solution> = new Array;
  
  testRating: number;
  testTaken: boolean = false;

  showQuestionAnswers: boolean = false;

  testResult: TestResult;
  showResult: boolean = false;

  constructor(private testService: TestService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.testId = params.id;
    });

   }

  ngOnInit() {
    this.testService.getTest(this.testId).subscribe(t => this.test = t);
    this.testService.getQuestions(this.testId).subscribe(q =>{
      this.questions = q;
    });
    this.testService.isTestDone(this.testId).subscribe(td => this.testTaken = td);

  }
  setChanged(event){
    let sol: Solution = new Solution;
    sol.id = event.target.name;
    sol.solution = event.target.value;
    for(let i = 0; i<this.solutions.length; i++){
      if(this.solutions[i].id == sol.id){
        this.solutions.splice(i,1);
      }
    }
    this.solutions.push(sol);
  }

  takeTest(){
    let userSolution: UserSolution = new UserSolution;
    userSolution.solutions = this.solutions;
    userSolution.testId = this.testId;

    this.testService.sendSolution(userSolution).subscribe(t => {
      this.testResult = t;
      this.showResult = true;
      this.testTaken = true;
    });
  }
  showAnswers(){
    if(this.showQuestionAnswers){
      this.showQuestionAnswers = false;
    }
    else{
      this.showQuestionAnswers = true;
    }
  }
  liveRate(){
    this.testService.sendLiveRate(this.testId,this.testRating).subscribe();
  }
  poolRate(event){
    if(event.target.name == "positive"){
      this.testService.sendPoolRate(this.testId,"positive").subscribe();
    }
    else{
      this.testService.sendPoolRate(this.testId,"negative").subscribe();
    }
  }

}
