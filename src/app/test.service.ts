import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './Test';
import { NewTest } from './newTest';
import { Question } from './question';
import { UserSolution } from './usersolution';
import { TestResult } from './testresult';
import { UsersTest } from './UsersTest';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTest(page: number,pageSize: number,order: string,orderby:string,live:boolean,title:string,ratingMin:number,ratingMax:number,priceMin:number,priceMax:number){
    return this.http.get<any>("/api/test/all?page="+page+ "&pagesize=" + pageSize + "&order=" + order + "&orderby=" + orderby + "&live=" + live + "&title=" + title + "&ratingMin=" + ratingMin + "&ratingMax=" + ratingMax + "&priceMin=" + priceMin + "&priceMax=" + priceMax);
  }
  getPoolTests(page: number){
    return this.http.get<any>("/api/user/test/pool?page="+page);
  }
  getTestsForUser(username: string):Observable<Test[]>{
    return this.http.get<Test[]>("/api/user/tests/"+username +"/true");
  }
  getPoolTestsForUser(username: string):Observable<Test[]>{
    return this.http.get<Test[]>("/api/user/tests/"+username +"/false");
  }
  getTest(id: number): Observable<Test>{
    return this.http.get<Test>("/api/test/"+id);
  }
  createTest(test: NewTest){
    return this.http.post<void>("/api/user/test/newtest",test);
  }
  getQuestions(testId: number): Observable<Question[]>{
    return this.http.get<Question[]>("/api/user/test/taketest/"+testId);
  }
  sendSolution(userSolution: UserSolution): Observable<TestResult>{
    return this.http.post<TestResult>("/api/user/test/sendsolution",userSolution);
  }
  isTestDone(testId): Observable<boolean>{
    return this.http.get<boolean>("/api/user/test/taken/"+testId);
  }
  sendPoolRate(testid: number, vote: string){
    return this.http.post<number>("/api/user/test/vote/"+testid+"/"+vote,null);
  }
  sendLiveRate(testid: number, rate: number){
    return this.http.post<number>("/api/user/test/rate/"+testid+"/"+rate,null);
  }
  isTestRated(testid: number): Observable<boolean>{
    return this.http.get<boolean>("/api/user/test/rated/"+testid)
  }
  isTestVoted(testid: number): Observable<boolean>{
    return this.http.get<boolean>("/api/user/test/voted/"+testid)
  }

  getAllTestOrderedByTitle(order: string) {
    return this.http.get<any>("/api/test/orderedbytitle?order="+ order+"?page=0");
  }

  getAllTestOrderedByRating(order: string) {
    return this.http.get<any>("/api/test/orderedbyrating?order="+ order+"?page=0");
  }

  getAllTestOrderedByPrice(order: string) {
    return this.http.get<any>("/api/test/orderedbyprice?order="+ order+"?page=0");
  }

  getLoggedUserCompletedTests(): Observable<UsersTest[]>{
    return this.http.get<UsersTest[]>("/api/user/teststaken");
  }

}
