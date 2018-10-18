import { Component, OnInit } from '@angular/core';

import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

  test: Test;
  testId: number;
  testTaken: boolean;
  testVoted: boolean;
  testRated: boolean;
  testRating: number;
  constructor(private testService: TestService,private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.testId = params.id;
    });
   }

  ngOnInit() {
    this.testService.getTest(this.testId).subscribe(t => this.test = t);
    this.testService.isTestDone(this.testId).subscribe(td => this.testTaken = td);
    this.testService.isTestRated(this.testId).subscribe(tr => this.testRated = tr);
    this.testService.isTestVoted(this.testId).subscribe(tv => this.testVoted = tv);
  }
  takeTest(){
    this.router.navigate(['test/take/'+this.testId]);
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
