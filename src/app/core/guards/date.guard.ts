import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateGuard implements CanActivate {
  constructor(private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      const date =  JSON.parse(localStorage.getItem('date')!) 
      if(date?.isDate){
        return true;
      }

      return this._router.navigate(['dates'])

   
  }
  
}
