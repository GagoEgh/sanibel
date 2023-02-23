import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  private count = 0;

  private routing = ['dates', 'personal', 'guests','booking'];
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

 

  getCount() {
    return this.count
  }

  setCount(id: number) {
    console.log(id)
    this.count = id
  }


  next() {
  
    
    if (this.count >= this.routing.length - 1) {
      this.count = this.routing.length - 1
   
      this._router.navigate([this.routing[this.count], this.count],
        { queryParamsHandling: 'merge' });
       
    } else {
      this.count++;
      this._router.navigate([this.routing[this.count], this.count],
        { queryParamsHandling: 'merge' })
    }
  }


  previous() {
    this.count--

    if (this.routing[this.count] === 'dates' && this.count === 0) {
   
      this._router.navigate([this.routing[this.count]],
        { queryParamsHandling: 'merge' })

    } else {
    
      this._router.navigate([this.routing[this.count], this.count],
        { queryParamsHandling: 'merge' })
    }

  }
}
