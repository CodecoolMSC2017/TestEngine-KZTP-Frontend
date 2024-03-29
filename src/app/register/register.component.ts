import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDetails } from '../registerdetails';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  registerDetails: RegisterDetails = new RegisterDetails();

  showError: boolean = false;

  errorMessage: string;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {}

  register() {
    const fieldsComplete = this.checkRegisterFields();
    const passwordChecker = this.checkRegisterPasswords();

    if (!fieldsComplete && !passwordChecker) {
      this.registerService.register(this.registerDetails).subscribe(() => {
        this.router.navigate(['activation']);
      },
      (error) => {
          this.showError = true;
          this.errorMessage = error.error.message;
      });
    }
  }

  private checkRegisterFields(): boolean {
    const result = !this.registerDetails.email || !this.registerDetails.password || !this.registerDetails.confirmationPassword|| !this.registerDetails.username;

    if (result) {
      this.showError = true;
      this.errorMessage = "Please fill out each inputs!";
      return result;
    }
  }

  private checkRegisterPasswords(): boolean {
    const result = this.registerDetails.password != this.registerDetails.confirmationPassword;

    if (result) {
      this.showError = true;
      this.errorMessage = "Passwords must be same!";
      return result;
    }
  }
}
