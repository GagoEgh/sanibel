import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GuestsService, trimRequiredValidator } from 'src/app/core';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent implements OnInit, OnDestroy {

  unSubscribe$ = new Subject<void>()
  guestForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _guestsService: GuestsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }



  ngOnInit(): void {
  
    this.formInit();

    this._activatedRoute.queryParamMap
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (res: any) => {
          let guests:any
          if(res.params.json){
            guests = JSON.parse(res.params.json);
          }
           
          this.addGuests();
          for (let guest = 0; guest < guests?.length; guest++) {
            let guestsForm = <FormArray>this.guestForm.controls['guests'];
            guestsForm.controls[guest].patchValue(guests[guest]);
            guestsForm.controls[guest].patchValue(guests[guest])
          }
        }
      })
  }

  formInit() {
    this.guestForm = this._fb.group({
      guests: this._fb.array([this.newGuest()]),
    });
 
  }


  getFormControlname(index: number, name: string, errore: string) {
    const isDirty = this.guests.controls[index].get(name)?.dirty
    const hasError = this.guests.controls[index].get(name)?.hasError(errore)


    if (this.guestForm.valid) {
      const guestsForm = this.guestForm.controls['guests'].value as Array<any>;
      const json = JSON.stringify(guestsForm)
      this._router.navigate(['guests', '2'],
        {
          queryParams: { json },
          queryParamsHandling: 'merge'
        })


      this._guestsService.setGuest();
    }
    return isDirty && hasError
  }

  get guests(): FormArray {
    return this.guestForm.get('guests') as FormArray
  }


  newGuest(): FormGroup {
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return this._fb.group({
      guestFirstName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      guestLastName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      guestEmail: ['', [trimRequiredValidator(), Validators.pattern(email)]],
    })
  }


  addGuests() {
    this.guests.push(this.newGuest());
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }
}

