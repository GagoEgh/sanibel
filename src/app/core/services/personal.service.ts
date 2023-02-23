import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class PersonalService {
 
  private isEmpty=false
  constructor() { }

  setPersonal() {
    localStorage.setItem('isPersonal','true')
  }

 

}
