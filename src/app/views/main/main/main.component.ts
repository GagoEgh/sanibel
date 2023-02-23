import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IBooking } from 'src/app/core';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
 
  unSubscribe$= new Subject<void>();
   booking!:IBooking;
  constructor(
    private _mainService: MainService,
    private _activatedRoute:ActivatedRoute,
    private _routr:Router
  ) { }


  ngOnInit(): void {
   
  }




  previous() {
    this._activatedRoute.queryParams
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe({
      next:()=>{
       
        this._mainService.previous()
      }
    })
  
  
  }

  next() {
  // console.log(this._activatedRoute.snapshot.params['id'])
    this._activatedRoute.queryParams
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe({
      next:(res)=>{
      
        this._mainService.next();
      }
    })
  }

  ngOnDestroy(): void {
   this.unSubscribe$.next();
   this.unSubscribe$.complete();
  }
}
