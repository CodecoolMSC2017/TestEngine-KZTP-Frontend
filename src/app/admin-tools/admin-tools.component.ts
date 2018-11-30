import { Component, OnInit } from '@angular/core';
import { NewNews } from '../NewNews';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {

  newNews: NewNews;
  showError: boolean = false;
  errorMessage: String;
  constructor(private adminTools: AdminService) { 
    this.newNews = new NewNews();
  }

  ngOnInit() {
  }

  createNews(){
    if(this.newNews.content != "" && this.newNews.title != "" && this.newNews.title && this.newNews.content){
      this.adminTools.createNews(this.newNews).subscribe();
    }else{
      this.errorMessage = "You have to fill all the fields";
      this.showError = true;
    }
  }

}
