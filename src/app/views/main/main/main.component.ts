import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  erroreDate = false;
  errorePersonal = false;
  erroreGuests = false;
  constructor(
    private _mainService: MainService,
    private _router: Router
  ) { }


  ngOnInit(): void { }
  goToDatesPage() {
    this._router.navigate(['dates'], { queryParamsHandling: 'merge' })
    this._mainService.setPersonaleErrore(false);
    this.errorePersonal = this._mainService.getPersonaleErrore();
    this._mainService.setGuestsErrore(false);
    this.erroreGuests = this._mainService.getGuestsErrore()
  }

  goToPersonalPage() {
    this._router.navigate(['personal', '1'], { queryParamsHandling: 'merge' })
    this._mainService.setGuestsErrore(false);
    this.erroreGuests = this._mainService.getGuestsErrore()
  }

  previous() {
    this._mainService.previous();
    this.erroreDate = this._mainService.getDateErrore()
    this.errorePersonal = this._mainService.getPersonaleErrore()
    this.erroreGuests = this._mainService.getGuestsErrore()
  }

  next() {
    this._mainService.next();
    this.erroreDate = this._mainService.getDateErrore()
    this.errorePersonal = this._mainService.getPersonaleErrore()
    this.erroreGuests = this._mainService.getGuestsErrore()
  }


}
