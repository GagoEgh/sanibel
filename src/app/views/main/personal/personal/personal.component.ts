import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { PersonalService } from 'src/app/core';
import { MainService } from 'src/app/core/services/main.service';
import { trimRequiredValidator } from 'src/app/core/validators/trimRequired';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {

  personalForm!: FormGroup;
  unSubscribe$ = new Subject<void>();
  isEmpty=false;
  constructor(
    private _fb: FormBuilder,
    private _personalService: PersonalService,
    private _activatedRoute: ActivatedRoute,
    private _mainService: MainService,
    private _router: Router
  ) { }


  ngOnInit(): void {

    this.formInit();

    this._activatedRoute.queryParams
      .pipe(takeUntil(this.unSubscribe$), map((res) => {
        this.personalForm.patchValue(res)
      })).subscribe()
   
  }


  formInit() {
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.personalForm = this._fb.group({
      firstName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      lastName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      email: ['', [trimRequiredValidator(), Validators.pattern(email)]],

    });

  }

  getFormControlname(name: string, errore: string) {
    const isDirty = this.personalForm.get(name)?.dirty;
    const hasError = this.personalForm.get(name)?.hasError(errore);


    if (this.personalForm.valid) {
      
      this.personalDate();
      this._personalService.setPersonal()
    }
    return isDirty && hasError
  }

  private personalDate(): void {
    const firstName = this.personalForm.get('firstName')?.value;
    const lastName = this.personalForm.get('lastName')?.value;
    const email = this.personalForm.get('email')?.value;
    this._router.navigate(['personal', '1'],
      {
        queryParams: { firstName, lastName, email },
        queryParamsHandling: "merge"
      })

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }
}


