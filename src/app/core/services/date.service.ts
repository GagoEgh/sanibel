import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

 
  constructor() { }

  setDate() {
    localStorage.setItem('isDate','true');
  }

}
