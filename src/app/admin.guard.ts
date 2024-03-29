import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
//
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuth().pipe(
      map(user => {
        if(user.authorities[0] == "ROLE_ADMIN"){
          return true;
        }
        this.router.navigate(['home']);
        return false;
    }),
      catchError(error => {
        this.router.navigate(['login']);
        return of(false);
      }
    ));
  }
}
