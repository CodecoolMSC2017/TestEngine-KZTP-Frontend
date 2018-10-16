import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTest(page: number){
    return this.http.get<any>("/api/test/all?page="+page);
  }
  getPoolTests(page: number){
    return this.http.get<any>("/api/user/test/pool?page="+page);
  }
}
