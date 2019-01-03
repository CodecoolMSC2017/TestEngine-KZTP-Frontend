import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Test } from '../Test';
import { TestService } from '../test.service';
import { UsersTest } from '../UsersTest';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;
  tests: Test[];
  pooltests:Test[];
  completedTests: UsersTest[];
  constructor(private userService:UserService, private testService:TestService) { }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(u => {
      this.user = u;
      this.testService.getTestsForUser(u.username).subscribe(t => this.tests = t);
      this.testService.getPoolTestsForUser(u.username).subscribe(t => this.pooltests = t);
      this.testService.getLoggedUserCompletedTests().subscribe(t => this.completedTests = t);
    });

  }

}
