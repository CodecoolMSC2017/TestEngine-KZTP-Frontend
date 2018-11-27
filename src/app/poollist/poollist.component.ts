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
  titleOrder = "none";
  ratingOrder = "none";
  priceOrder = "none";
  pageSize:number =10
  order:string = "asc";
  orderBy:string = "";
  currentPage:number = 0;
  live:boolean = false;
  title:string="";
  ratingMin:number=0;
  ratingMax:number = 5;
  priceMin:number=0;
  priceMax:number=9999;
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getAllTest(this.currentPage,this.pageSize,this.order,this.orderBy,this.live,this.title,this.ratingMin,this.ratingMax,this.priceMin,this.priceMax).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
      for(var i = 0 ; i < stuff.totalPages ; i++){
        this.pages.push(i);
      }
    })
  }

  goto(page: number){
    this.currentPage = page;
    this.testService.getAllTest(page,this.pageSize,this.order,this.orderBy,this.live,this.title,this.ratingMin,this.ratingMax,this.priceMin,this.priceMax).subscribe(stuff => {
      this.tests = stuff.content;
      this.totalPages = stuff.totalPages;
      this.pages=[];
      for(var i = 0 ; i < stuff.totalPages ; i++){
        this.pages.push(i);
      }

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
    this.orderBy = "pool_rating";
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
