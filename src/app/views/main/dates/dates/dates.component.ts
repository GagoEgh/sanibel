import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateService, SelectDate } from 'src/app/core';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],

})
export class DatesComponent implements OnInit {
  date!: SelectDate;
  rangeDate!: Date[];
  datePipe = new DatePipe('en-US');

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.date = this.dateService.getDate();
    console.log(this.date)
  }

  onChange(result: Date[]): void {

    if (result) {

      const start = this.datePipe.transform(result[0], 'MMM d, y')!;
      const end = this.datePipe.transform(result[1], 'MMM d, y')!;

      const date = {
        start: start,
        end: end
      }

      this.dateService.setDate(new SelectDate(date))
      this.date = this.dateService.getDate();
    }

  }


}
