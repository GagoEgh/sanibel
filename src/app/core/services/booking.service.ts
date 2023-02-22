import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IBooking } from '../models/IBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  booking!:IBooking

  private booking$ = new BehaviorSubject<IBooking|null>(null);
  private obsBooking$ = this.booking$.asObservable();

  constructor() { }

 
  setBooking$(newValue: IBooking) {
    this.booking$.next(newValue)
  }





  getBooking$():Observable<any> {
    return this.obsBooking$

  }


}
