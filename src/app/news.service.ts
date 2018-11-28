import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditNews } from './EditNews';
import { NewNews } from './NewNews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  getAllNews(page: number, pagesize: number): Observable<any>{
    return this.http.get<any>("/api/news?page="+page+"&pagesize="+pagesize);
  }

  editNews(editNews: EditNews){
    return this.http.put<void>("/api/admin/news/edit",editNews);
  }

  deleteNews(id: number){
    return this.http.delete<void>("/api/admin/news/delete/"+id);
  }

  createNews(newNews: NewNews){
    return this.http.post<void>("/api/admin/news/create",newNews);
  }
}
