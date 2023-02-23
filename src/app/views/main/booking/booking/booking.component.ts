import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IBooking } from 'src/app/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
 
})
export class BookingComponent implements OnInit {

  booking$ = new Observable<IBooking>();
  booking!:IBooking
  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   // this.booking$ = this._activatedRoute.queryParams


    this._activatedRoute.queryParams
    .subscribe({
      next:(res)=>{
        this.booking=res
      }
    })
  }
}
