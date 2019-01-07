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
  authority:String;
  changePasswordShow:boolean=false;
  userProgress:number;
  progressBarPercent:number;
  nextRank:String;
  constructor(private userService:UserService, private testService:TestService) { }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(u => {
      this.user = u;
      this.userService.getUserProgress().subscribe((any) => {
        this.userProgress = any;
        if(u.rank == "newbie") {
          this.nextRank ="user";
          this.progressBarPercent = Math.round(this.userProgress/15 * 100);
        }
        else if (u.rank == "user"){
          this.nextRank = "elite";
          this.progressBarPercent = this.userProgress;
        }
        else {
          this.progressBarPercent = this.userProgress;
        }
      });

      if(u.authorities[0] == "ROLE_ADMIN") {
        this.authority = "admin";
      }
      else {
        this.authority = "user";
      }
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

  showHideChangePassword() {
    if(!this.changePasswordShow) {
      this.changePasswordShow = true;
      document.getElementById('changePasswordContainer').className='fading';
      document.getElementById('pwsubmitbutton').className='sliding';
      var someArray = [1, 2, 3];
      someArray.forEach((item, index) => {
          document.getElementById('pwlabel'+ item).className='sliding';
          document.getElementById('pwinput'+ item).className='sliding';
      });
    }
    else {
      this.changePasswordShow = false;
      document.getElementById('changePasswordContainer').className='fadingUp';
      document.getElementById('pwsubmitbutton').className='slidingUp';
      var someArray = [1, 2, 3];
      someArray.forEach((item, index) => {
          document.getElementById('pwlabel'+ item).className='slidingUp';
          document.getElementById('pwinput'+ item).className='slidingUp';
      });
    }
  }


}
