import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GuestsService } from 'src/app/core';
import { MainService } from 'src/app/core/services/main.service';
import { trimRequiredValidator } from 'src/app/core/validators/trimRequired';

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
    private _mainService: MainService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }



  ngOnInit(): void {
    this._mainService.setCount(this._activatedRoute.snapshot.params['id']);

    this.formInit();
    this._activatedRoute.queryParamMap
    .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (res: any) => {
          this.guestForm.controls['guests'].patchValue([res.params])
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
      const guests = this.guestForm.controls['guests'].value as Array<any>;

      guests.forEach((guest) => {
        let guestFirstName = guest.guestFirstName;
        let guestLastName = guest.guestLastName;
        let guestEmail = guest.guestEmail;

        this._router.navigate(['guests', '2'],
          {
            queryParams: { guestFirstName, guestLastName, guestEmail },
            queryParamsHandling: 'merge'
          })
      })
      this._guestsService.setGuest();
      this._mainService.setCount(this._activatedRoute.snapshot.params['id']);

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
    this.guests.push(this.newGuest())
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }
}

