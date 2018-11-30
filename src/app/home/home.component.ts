import { Component, OnInit } from '@angular/core';
import { Test } from '../Test';
import { News } from '../News';
import { TestService } from '../test.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularTests:Test[];
  news:News[];
  currentPage:number =0;
  testNumber:number=0;
  totalPages:number;
  constructor(private newsService: NewsService,private testService:TestService) { }

  ngOnInit() {
    this.newsService.getAllNews(this.currentPage,5).subscribe(news => {
      this.news = news.content;
      this.totalPages = news.totalPages;
    });
    this.testService.getAllTest(0,5,"desc","rating",true,"",0,5,0,9999).subscribe(stuff =>this.popularTests = stuff.content);
  }

  nextTest() {
    if(this.testNumber < this.popularTests.length-1) {
      this.testNumber++;
    }
    else {
      this.testNumber =0;
    }
  }

  previousTest() {
    if(this.testNumber > 0) {
      this.testNumber--;
    }
    else {
      this.testNumber =this.popularTests.length-1;
    }
  }

  getOlderNews() {
    this.currentPage++;
    this.newsService.getAllNews(this.currentPage,5).subscribe(news => this.news = news.content);
  }

  getNewNews() {
    this.currentPage--;
    this.newsService.getAllNews(this.currentPage,5).subscribe(news => this.news = news.content);
  }

}
