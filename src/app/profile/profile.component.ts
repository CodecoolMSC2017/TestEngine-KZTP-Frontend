import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Test } from '../Test';
import { TestService } from '../test.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  user:User;
  tests: Test[];
  testPage:number=0;
  constructor(private userService: UserService, private route: ActivatedRoute, private testService: TestService) {
    this.route.params.subscribe(params => {
      this.username = params.id;
    });
  }

  ngOnInit() {
    this.userService.getUserByUsername(this.username).subscribe(u => this.user = u);
    this.testService.getTestsForUser(this.username,this.testPage).subscribe(t => this.tests = t.content);
  }

}
