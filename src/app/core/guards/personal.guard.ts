import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { MainService } from '../services/main.service';
import { PersonalService } from '../services/personal.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuard implements CanActivate {
  constructor(
    private _mainService: MainService,
    private _personal: PersonalService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isPersonal = JSON.parse(localStorage.getItem('isPersonal')!)
    if (isPersonal) {

      return true;
    }

    return false
  }

}
