import { Component, OnInit, NgZone } from '@angular/core';
import { LoginDetails } from '../login-details';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginDetails: LoginDetails = new LoginDetails();

  showError: boolean = false;

  errorMessage: string;

  handleAuthSuccess = user => {
    this.ngZone.run(() => this.router.navigate(['advertisements']));
  };
  handleAuthError = error => {
    if (error.status == 401) {
      this.showError = true;
      this.errorMessage = "Invalid email or password!";
    }
  };



  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) {
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

}
