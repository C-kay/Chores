import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap, first } from 'rxjs/operators';
import{AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {
  
  constructor(private router:Router, private auth:AuthService, private afAuth:AngularFireAuth){

  }
  
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user=>!!user),
      tap(loggedIn =>{
        if(!loggedIn){
          console.log(loggedIn);
          console.log('access denied');
          this.router.navigate(['login']);
        }
      })
    );
  }
  
}
