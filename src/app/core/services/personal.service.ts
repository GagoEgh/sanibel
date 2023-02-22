import { Injectable } from '@angular/core';
import { PersonalDTO } from '../models/personalDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  personal!: PersonalDTO
  constructor() { }

  setPersonal(newPerson: PersonalDTO) {
    this.personal = newPerson;
    const personalJson = {
      isPersonal: true,
      personal:this.personal 
    }
    localStorage.setItem('personal',JSON.stringify(personalJson))
  }

  getPersonal() {
    const personalParse = JSON.parse(localStorage.getItem('personal')!)
    this.personal = personalParse?.personal
    return this.personal
  }
}
