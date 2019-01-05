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
  livePage:number=0;
  poolPage:number=0;
  completedTests: UsersTest[];
  selectedLiveTest:Test;
  selectedPoolTest:Test;
  livePercentage:number;
  poolPercentage:number;
  liveIncome:number;
  poolIncome:number;
  liveTimesTaken:number;
  poolTimesTaken:number;
  constructor(private userService:UserService, private testService:TestService) { }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(u => {
      this.user = u;
      this.testService.getTestsForUser(u.username,this.livePage).subscribe(t => {
        this.tests = t.content;
        this.selectedLiveTest = t.content[0];
        this.getTestDetailsLive(t.content[0].id);
      });
      this.testService.getPoolTestsForUser(u.username,this.poolPage).subscribe(t => {
        this.pooltests = t.content;
        this.selectedPoolTest = t.content[0];
        this.getTestDetailsPool(t.content[0].id);
      });
      this.testService.getLoggedUserCompletedTests().subscribe(t => this.completedTests = t);
    });

  }

  setSelectedLiveTest(test:Test) {
    this.getTestDetailsLive(test.id);
    this.selectedLiveTest = test;
  }

  setSelectedPoolTest(test:Test) {
    this.getTestDetailsPool(test.id);
    this.selectedPoolTest = test;
  }

  getTestDetailsLive(id:number) {
    this.testService.getTestDetails(id).subscribe(details =>{
      this.livePercentage = details.percentage;
      this.liveTimesTaken = details.timesTaken;
      this.liveIncome = details.income;
    });
  }

  getTestDetailsPool(id:number) {
    this.testService.getTestDetails(id).subscribe(details => {
      this.poolPercentage = details.percentage;
      this.poolTimesTaken = details.timesTaken;
      this.poolIncome = details.income;
    });
  }

}
