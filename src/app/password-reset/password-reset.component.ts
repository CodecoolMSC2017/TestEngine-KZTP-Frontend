import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../ResetPassword';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.passwordReset = new ResetPassword();
    this.route.queryParams.subscribe(params=>{
      this.passwordReset.token= params.token;
    })
   }

  showError: boolean = false;
  errorMessage: String;
  passwordReset: ResetPassword;

  ngOnInit() {
  }

  resetPassword(){
    if(this.passwordReset.password != this.passwordReset.password2){
      return;
    }
    this.userService.resetPassword(this.passwordReset).subscribe(pw => {
      this.router.navigate(['login']);
    }),
    (error) =>{
      this.errorMessage = error.error.message;
      this.showError = true;
    };
  }

}
