import { Component, OnInit } from '@angular/core';

import { Test } from '../Test';
import { TestService } from '../test.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

  test: Test;
  testId: number;
  constructor(private testService: TestService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.testId = params.id;
    });
   }

  ngOnInit() {
    this.testService.getTest(this.testId).subscribe(t => this.test = t);
  }

}