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
  titleOrder = "none";
  ratingOrder = "none";
  priceOrder = "none";
  pageSize:number =10
  order:string = "asc";
  orderBy:string = "";
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getAllTest(0,this.pageSize,this.order,this.orderBy).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
      for(var i = 0 ; i < stuff.totalPages ; i++){
        this.pages.push(i);
      }
    })
  }
  goto(page: number){
    this.testService.getAllTest(page,this.pageSize,this.order,this.orderBy).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
    })
  }

  orderByTitle() {
    this.orderBy = "title";
    if(this.titleOrder == "none" || this.titleOrder =="desc") {
      this.titleOrder = "asc";
    }
    else if(this.titleOrder =="asc") {
      this.titleOrder = "desc";
    }
    this.order = this.titleOrder;
    this.goto(0);
  }

  orderByRating() {
    this.orderBy = "rating";
    if(this.titleOrder == "none" || this.titleOrder =="desc") {
      this.titleOrder = "asc";
    }
    else if(this.titleOrder =="asc") {
      this.titleOrder = "desc";
    }
    this.order = this.titleOrder;
    this.goto(0);
  }

  orderByPrice() {
    this.orderBy = "price";
    if(this.priceOrder == "none" || this.priceOrder =="desc") {
      this.priceOrder = "asc";
    }
    else if(this.priceOrder =="asc") {
      this.priceOrder = "desc";
    }
    this.order = this.priceOrder;
    this.goto(0);
  }

  setPagesize(value: number) {
    if(this.pageSize != value) {
      this.pageSize = value;
      this.goto(0);
    }

  }

}
