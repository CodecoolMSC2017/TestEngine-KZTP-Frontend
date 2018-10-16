import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './Test';

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
  getTestsForUser(username: string):Observable<Test[]>{
    return this.http.get<Test[]>("/api/user/tests/"+username);
  }
  getTest(id: number): Observable<Test>{
    return this.http.get<Test>("/api/test/"+id);
  }
}
