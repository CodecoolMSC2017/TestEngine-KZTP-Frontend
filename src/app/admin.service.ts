import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewNews } from './NewNews';
import { EditNews } from './EditNews';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //News
  createNews(news: NewNews){
    return this.http.post("/api/admin/news/create",news);
  }
  deleteNews(id: number){
    return this.http.delete("/api/admin/news/delete/"+id);
  }
  editNews(news: EditNews){
    return this.http.put("/api/admin/news/edit",news);
  }
}
