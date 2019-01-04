import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  constructor(private http:HttpClient) { }

  activateUser(token:String) {
    return this.http.get<any>("/api/register/activate?token=" + token);
  }

  reSendEmail(email:String) {
    return this.http.get<any>("/api/register/resend/"+email);
  }
}
