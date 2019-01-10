import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestreportService {

  constructor(private http: HttpClient) { }

  reportTest(testId:number,description:String,userdescription:String){
    return this.http.post<String>("/api/user/test/report/"+ testId + "?description=" + description + "&userdescription=" + userdescription,null);
  }

  getReportedTests(page:number,pageSize:number) {
    return this.http.get<any>("/api/admin/test/reportedtests?page="+page+"&pagesize=" + pageSize);
  }

  resolveReport(reportId:number) {
    return this.http.post<any>("/api/admin/report/solved/" + reportId,null);
  }
}
