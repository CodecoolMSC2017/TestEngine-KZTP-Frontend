import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { UserSolution } from '../usersolution';
import { Solution } from '../solution';

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

  testResult: number;
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

  }
  setChanged(event){
    let sol: Solution = new Solution;
    sol.id = event.target.name;
    sol.solution = event.target.value;
    if(!this.solutions.includes(sol)){
      this.solutions.push(sol);
    }
  }

  takeTest(){
    let userSolution: UserSolution = new UserSolution;
    userSolution.solutions = this.solutions;
    userSolution.testId = this.testId;

    this.testService.sendSolution(userSolution).subscribe(t => {
      this.testResult = t;
      this.showResult = true;
    });
  }

}
