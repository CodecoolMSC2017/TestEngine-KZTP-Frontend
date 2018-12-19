import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestreportService {

  constructor(private http: HttpClient) { }

  reportTest(testId:number,description:String){
    return this.http.post<String>("/api/user/test/report/"+ testId,description);
  }
}
