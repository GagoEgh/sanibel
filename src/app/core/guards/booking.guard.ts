import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanActivate {
  constructor(
    private _mainService: MainService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isGuests = JSON.parse(localStorage.getItem('isGuests')!)
    if (isGuests) {
      return true
    }

    return false;
  }

}
