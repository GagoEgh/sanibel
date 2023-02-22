import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  routing = ['dates', 'personal', 'guests', 'booking'];
  count = 0;
  constructor(
    private _router: Router
  ) { }

  goDates() {
    this.count = 0
    this._router.navigate(['dates'])
  }

  goPersonal() {
    this.count = 1
    this._router.navigate(['personal'])
  }

  goGuests() {
    this.count=2
    this._router.navigate(['guests'])
  }

  goBooking() {
    this.count=3
    this._router.navigate(['booking'])
  }
 


  previous() {
    this.count--
    if (this.count < 0) {
      this.count = 0
    }


    this._router.navigate([this.routing[this.count]])
  }

  next() {
    this.count++
    if (this.count > this.routing.length) {
      this.count = this.routing.length
    }

    this.routing[this.count];
    this._router.navigate([this.routing[this.count]])
  }
}
