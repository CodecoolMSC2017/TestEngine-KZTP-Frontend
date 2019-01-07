import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { ResetPassword } from './ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(name: string): Observable<User>{
    return this.http.get<User>("/api/user/"+name);
  }

  getLoggedUser(): Observable<User>{
    return this.http.get<User>("/api/user/mysettings");
  }

  getUserProgress() {
    return this.http.get<any>("/api/user/rank/progress");
  }

  sendPasswordResetEmail(email: String){
    return this.http.post("/api/requestpasswordreset",email);
  }

  resetPassword(resetPassword: ResetPassword){
    return this.http.put("/api/resetpassword",resetPassword);
  }
}
