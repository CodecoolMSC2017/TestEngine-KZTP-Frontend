import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Test } from '../Test';

@Component({
  selector: 'app-poollist',
  templateUrl: './poollist.component.html',
  styleUrls: ['./poollist.component.css']
})
export class PoollistComponent implements OnInit {

  tests: Test[];
  totalPages: number;
  pages: Array<number> = new Array;
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getPoolTests(0).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
      for(var i = 0 ; i < stuff.totalPages ; i++){
        this.pages.push(i);
      }
    })
  }
  goto(page: number){
    this.testService.getPoolTests(page).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
    })
  }

}
