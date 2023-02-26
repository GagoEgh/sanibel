import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  constructor() { }

  setGuest() {
    localStorage.setItem('isGuests', 'true')
  }

  getGuest() {
   return localStorage.getItem('isGuests')
  }


}
