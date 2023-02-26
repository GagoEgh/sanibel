import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor() { }

  setPersonal() {
    localStorage.setItem('isPersonal', 'true')
  }

  getPersonal() {
    return localStorage.getItem('isPersonal')
  }

}
