import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../activation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  userToken:String="";
  email:String="";
  tokenErrorMessage:String;
  emailErrorMessage:String;
  emailSent:boolean;
  tokenSuccesful:boolean;
  showTokenError:boolean=false;
  showEmailError:boolean=false;
  time:number =4;
  interval;

  constructor(private activationService:ActivationService,private router: Router) { }

  ngOnInit() {
  }

  startTimer() {
    this.interval = setInterval(() => {this.time--},1000);
  }

  activateUser() {
    this.activationService.activateUser(this.userToken).subscribe(any=>{
      this.showTokenError =false;
      this.tokenSuccesful = true;
      this.startTimer();
      setTimeout(()=>{ this.router.navigate(['login']); }, 4000)
    },
    error => {
      this.showTokenError = true;
      this.tokenErrorMessage = error.error.message;
    });
  }

  resendEmail() {
    this.activationService.reSendEmail(this.email).subscribe(any=>{
      this.emailSent = true;
      this.showEmailError = false;
    },
      error => {
        this.showEmailError = true;
        this.emailErrorMessage = error.error.message;
      });
  }

}
