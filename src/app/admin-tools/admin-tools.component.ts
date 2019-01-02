import { Component, OnInit } from '@angular/core';
import { NewNews } from '../NewNews';
import { AdminService } from '../admin.service';
import { News } from '../News';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs';
import { EditNews } from '../EditNews';
import { TestreportService } from '../testreport.service';
import { TestReport } from '../TestReport';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {

  newNews: NewNews;
  showError: boolean = false;
  errorMessage: String;

  newsList: News[];
  currentPage:number = 0;
  reportsPage:number=0;
  reportsPageSize:number= 10;
  totalPages:number;
  selectedNews: News;
  reportedTests:TestReport[];
  constructor(private adminTools: AdminService, private newsService: NewsService,private testReportService:TestreportService) {
    this.newNews = new NewNews();
  }

  ngOnInit() {
    this.newsService.getAllNews(this.currentPage,5).subscribe(n => {
      this.newsList = n.content;
      this.totalPages = n.totalPages;
    });
    this.testReportService.getReportedTests(this.reportsPage,this.reportsPageSize).subscribe(any => this.reportedTests = any.content);
  }

  createNews(){
    if(this.newNews.content != "" && this.newNews.title != "" && this.newNews.title && this.newNews.content){
      this.adminTools.createNews(this.newNews).subscribe();
    }else{
      this.errorMessage = "You have to fill all the fields";
      this.showError = true;
    }
  }

  changeSelected(event){
    return this.newsService.getNewsById(event.target.id).subscribe(n => {
      this.selectedNews = n;
      console.log(this.selectedNews);
    });
  }
  editNews(){
    if(this.selectedNews){
      let editNews: EditNews = new EditNews();
      editNews.content = this.selectedNews.content;
      editNews.title = this.selectedNews.title;
      editNews.id = this.selectedNews.id;
      return this.newsService.editNews(editNews).subscribe(()=>{
        this.newsService.getAllNews(this.currentPage,5).subscribe(n => {
          this.newsList = n.content;
          this.totalPages = n.totalPages;
        });
      });
    }
  }

  resolveReport(report:TestReport) {

    this.testReportService.resolveReport(report.id).subscribe(any => this.reportedTests[this.reportedTests.indexOf(report)].solved=true);
  }
}
