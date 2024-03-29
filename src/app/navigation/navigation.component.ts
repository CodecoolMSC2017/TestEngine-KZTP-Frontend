import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from '../user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(u => {
      if(u){
        this.authService.isLoggedIn = true;
        this.authService.userRank = u.rank;
        this.authService.authority = u.authorities[0];
      }
      else{
        this.authService.isLoggedIn = false;
        this.authService.userRank = "newbie";
        this.authService.authority="none";
      }
    });

  }

  deleteAuth() {
    this.authService.deleteAuth()
      .pipe(finalize(() => {
        this.router.navigate(['login']);
        this.authService.isLoggedIn = false;
        this.authService.userRank = "newbie";
        this.authService.authority="none";
      }
      ))
      .subscribe();
  }

}
