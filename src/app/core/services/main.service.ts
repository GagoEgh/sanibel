import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { DateService } from './date.service';
import { GuestsService } from './guests.service';
import { PersonalService } from './personal.service';


interface obj {
  isIt: string | null,
  loc: string,
  rout: string[],
  err: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private erroreDate = false;
  private errorePersonal = false;
  private erroreGuests = false;




  constructor(
    private _router: Router,
    private _personalService: PersonalService,
    private _dateService: DateService,
    private _guestsService: GuestsService,
  ) { }

  getDateErrore() {
    return this.erroreDate
  }

  setDateErrore(errore: boolean) {
    this.erroreDate = errore
  }

  getPersonaleErrore() {
    return this.errorePersonal
  }
  setPersonaleErrore(errore: boolean) {
    this.errorePersonal = errore
  }

  getGuestsErrore() {
    return this.erroreGuests
  }

  setGuestsErrore(errore: boolean) {
    this.erroreGuests = errore
  }




  goToNextPage(obj: obj) {
    let href = location.href;

    if (obj.isIt && href.includes(obj.loc)) {
     this._router.navigate(obj.rout,
        { queryParamsHandling: 'merge' })
   
          obj.err = false;
          this.setDateErrore(obj.err);
          this.setGuestsErrore(obj.err);
          this.setPersonaleErrore(obj.err)
      
    }
   
  }

  next() {
    let href = location.href;
    const dateObj: obj = {
      isIt: this._dateService.getDate(),
      loc: 'dates',
      rout: ['personal', '1'],
      err: false
    }

    const personalObj: obj = {
      isIt: this._personalService.getPersonal(),
      loc: 'personal',
      rout: ['guests', '2'],
      err: false
    }

    const guestObj: obj = {
      isIt: this._guestsService.getGuest(),
      loc: 'guests',
      rout: ['booking', '3'],
      err: false
    }

    if (!this._dateService.getDate()) {
      this.setDateErrore(true);
    }


    this.goToNextPage(dateObj)
  

    if (!this._personalService.getPersonal() && href.includes('personal')) {
      this.setPersonaleErrore(true)
    }

    this.goToNextPage(personalObj);
    this.goToNextPage(guestObj)


    if (!this._guestsService.getGuest() && href.includes('guests')) {
      this.setGuestsErrore(true);
      this.setDateErrore(false);
    }
  }

  goToPreviousPage(loc: string, nav: string[]) {
    let href = location.href;
    this.setPersonaleErrore(false)
    this.setDateErrore(false);
    this.setGuestsErrore(false)
    if (href.includes(loc)) {
      this._router.navigate(nav,
        { queryParamsHandling: 'merge' });
    }
  }

  previous() {
    this.goToPreviousPage('booking', ['guests', '2']);
    this.goToPreviousPage('guests', ['personal', '1']);
    this.goToPreviousPage('personal', ['dates'])

  }
}

