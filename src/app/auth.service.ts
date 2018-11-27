import { Injectable } from '@angular/core';
import { LoginDetails } from './login-details';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  userRank: String;

  constructor(private http: HttpClient) { 
    this.isLoggedIn = false;
  }

  getAuth(loginDetails?: LoginDetails): Observable<User> {
    const httpOptions = {};
    if (!isUndefined(loginDetails)) {
      httpOptions['headers'] = new HttpHeaders({
          'Authorization': 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password)
      });
    }
    return this.http.get<User>('/api/auth', httpOptions);
  }
  deleteAuth(): Observable<void> {
    return this.http.delete<void>('/api/auth');
  }
}
