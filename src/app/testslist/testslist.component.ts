import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Test } from '../Test';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testslist',
  templateUrl: './testslist.component.html',
  styleUrls: ['./testslist.component.css']
})
export class TestslistComponent implements OnInit {
  tests: Test[];
  totalPages: number;
  pages: Array<number> = new Array;
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getAllTest(0).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
      for(var i = 0 ; i < stuff.totalPages ; i++){
        this.pages.push(i);
      }
    })
  }
  goto(page: number){
    this.testService.getAllTest(page).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
    })
  }

}
