import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { map, Observable } from 'rxjs';
import { BookingService, IBooking } from 'src/app/core';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],

})
export class DatesComponent implements OnInit {
  date = null;
  // rangeDate=null;
  rangeDate!: Date[];
  datePipe = new DatePipe('en-US');
  first!: string | null;
  last!: string | null;

  booking$ = new Observable<any>()

  constructor(
    private _bookingService: BookingService
  ) { }

  ngOnInit(): void {

  }

  onChange(result: Date[]): void {



  if(result){

    this.first = this.datePipe.transform(result[0], 'MMM d, y');
    this.last = this.datePipe.transform(result[1], 'MMM d, y');
    localStorage.setItem('isDate','true');
  }
 

  }


}
