import { Injectable } from '@angular/core';
import { PersonalDTO } from '../models/personalDTO';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  guests!: PersonalDTO[]
  constructor() { }

  setGuest(newGuest: any) {
    console.log(newGuest)
    //this.guests.push(newGuest)
   // this.guests = newGuest;
    const guestJson = {
      isGuest: true,
      guests: newGuest
    }
    localStorage.setItem('guests', JSON.stringify(guestJson))
  }

  getGuest() {
    const guestParse = JSON.parse(localStorage.getItem('guests')!)
    this.guests = guestParse?.guests
    return this.guests
  }
}
