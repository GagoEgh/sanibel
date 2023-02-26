import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class DateGuard implements CanActivate {
  constructor(
    private _mainService: MainService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isDate = JSON.parse(localStorage.getItem('isDate')!)
    if (isDate) {
      return true;
    }
    return false
  }

}
