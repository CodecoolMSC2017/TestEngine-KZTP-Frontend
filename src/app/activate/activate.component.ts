import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../activation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  token:String;
  success:boolean = false;
  tokenErrorMessage:String;
  tokenSuccesful:boolean;
  showTokenError:boolean=false;
  time:number =4;
  interval;

  constructor(private activationService:ActivationService,private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
    this.token = params.token;
  });}

  startTimer() {
    this.interval = setInterval(() => {this.time--},1000);
  }

  ngOnInit() {
    console.log(this.token);
    if(this.token == 'activated') {
      this.success = true;
    }
    else {
      this.activationService.activateUser(this.token).subscribe(any=>{
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
  }

}
