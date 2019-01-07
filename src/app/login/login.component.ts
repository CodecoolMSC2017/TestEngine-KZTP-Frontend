import { Component, OnInit, NgZone } from '@angular/core';
import { LoginDetails } from '../login-details';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails: LoginDetails = new LoginDetails();

  showPasswordResetError: boolean = false;

  showError: boolean = false;

  errorMessage: string;

  passwordResetEmail: String;

  handleAuthSuccess = user => {
    this.ngZone.run(() =>{
      this.authService.isLoggedIn = true;
      this.authService.getAuth().subscribe(u => {
        this.authService.userRank = u.rank;
        this.authService.authority = u.authorities[0];
      });
      this.router.navigate(['tests']);
    });
  };
  handleAuthError = error => {
    if (error.status == 401) {
      this.showError = true;
      this.errorMessage = "Invalid email or password!";
    }
    else if(error.status == 500){
      this.showError = true;
      this.errorMessage = error.error.message;
    }
  };



  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService) {

      this.authService.getAuth().subscribe();

    }

  ngOnInit():void {
  }

  getAuth() : void {
    const fieldsComplete = this.checkLoginFields();

    if (!fieldsComplete) {
      this.authService.getAuth(this.loginDetails)
        .subscribe(this.handleAuthSuccess, this.handleAuthError);

    }
  }

  private checkLoginFields() : boolean {
    const result = !this.loginDetails.username || !this.loginDetails.password;
    if (result) {
      this.showError = true;
      this.errorMessage = "Email and password cannot be empty!"
      return result;
    }
  }

  showPassworReset(){
    var passwordResetDiv = document.getElementById("passwordReset");
    passwordResetDiv.classList.remove('hidden');
  }

  sendPasswordResetEmail(){
    console.log(this.passwordResetEmail);
    this.userService.sendPasswordResetEmail(this.passwordResetEmail).subscribe(r => {
      this.router.navigate(['login']);
    },(error)=>{
      this.showPasswordResetError = true;
      this.showPasswordResetError = error.error.message;
    })
  }


}
