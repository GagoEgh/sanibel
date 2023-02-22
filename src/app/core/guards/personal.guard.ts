import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuard implements CanActivate {
  constructor(private _router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
      const personal =  JSON.parse(localStorage.getItem('personal')!) 
      if(personal?.isPersonal){
        return true;
      }

      return this._router.navigate(['dates']) 
  }
  
}
