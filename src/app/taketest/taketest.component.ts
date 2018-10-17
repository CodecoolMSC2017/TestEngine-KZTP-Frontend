import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { UserSolution } from '../usersolution';
import { User } from '../user';

@Component({
  selector: 'app-taketest',
  templateUrl: './taketest.component.html',
  styleUrls: ['./taketest.component.css']
})
export class TaketestComponent implements OnInit {

  test: Test;
  testId: number;
  questions: Question[];
  solutions: Map<number,string> = new Map;

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
    this.solutions.set(event.target.name,event.target.value);
  }

  takeTest(){
    let userSolution: UserSolution = new UserSolution;
    let solutions = Array.from( this.solutions.values());
    userSolution.solutions = solutions;
    userSolution.testId = this.testId;
    
    this.testService.sendSolution(userSolution).subscribe(t => {
      this.testResult = t;
      this.showResult = true;
    });
  }

}
