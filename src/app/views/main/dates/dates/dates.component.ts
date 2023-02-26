import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DateService, IBooking } from 'src/app/core';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesComponent implements OnInit {
  date$ = new Observable<IBooking>()
  rangeDate!: Date[];
  datePipe = new DatePipe('en-US');
 
  constructor(
    private dateService: DateService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.date$ = this._activatedRoute.queryParams;
  }


  onChange(result: Date[]): void {
    if (result) {
      const start = this.datePipe.transform(result[0], 'MMM d, y')!;
      const end = this.datePipe.transform(result[1], 'MMM d, y')!;
      this._router.navigate(['dates'],
        {
          queryParams: { start, end },
          queryParamsHandling: "merge"
        });

       this.dateService.setDate()
    }

  }


}
