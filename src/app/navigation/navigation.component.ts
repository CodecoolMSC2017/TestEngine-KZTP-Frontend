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

  user: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(u => {
      if(u){
        this.authService.isLoggedIn = true;
      }
      else{
        this.authService.isLoggedIn = false;
        this.authService.userRank = "newbie";
      }
    });

  }

  deleteAuth() {
    this.authService.deleteAuth()
      .pipe(finalize(() => {
        this.router.navigate(['login']);
        this.authService.isLoggedIn = false;
        this.authService.userRank = "newbie";
      }
      ))
      .subscribe();
  }

}
