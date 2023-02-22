import { Injectable } from '@angular/core';
import { SelectDate } from '../models/IDate';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private date!: SelectDate
  constructor() { }

  setDate(newDate: SelectDate) {
    this.date = newDate;
    const dateResolver = {
      isDate: true,
      dates: this.date
    }

    localStorage.setItem('date', JSON.stringify(dateResolver));
  }

  getDate() {
    const parsDate = JSON.parse(localStorage.getItem('date')!)
    this.date = parsDate?.dates
    return this.date
  }


}
