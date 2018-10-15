import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDetails } from './registerdetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  
  register(registerDetails: RegisterDetails): Observable<void> {
    return this.http.post<void>('api/register', {
      email: registerDetails.email,
      username: registerDetails.username,
      password: registerDetails.password,
      confirmationPassword: registerDetails.confirmationPassword
    })
  }
}
