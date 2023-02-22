import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trimRequiredValidator } from 'src/app/core/validators/trimRequired';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personalForm!: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.personalForm = this._fb.group({
      firstName: ['', [trimRequiredValidator()]],
      lastName: ['', [trimRequiredValidator()]],
      email: ['', [trimRequiredValidator(), Validators.pattern(email)]],

    });
  }

  getFormControlname(name: string, errore: string) {
    const isDirty = this.personalForm.get(name)?.dirty;
    const hasError = this.personalForm.get(name)?.hasError(errore);
    return isDirty && hasError
  }
  submitForm(): void {
    if (this.personalForm.valid) {
     // const register = new RegisterDTO(this.registerForm);
      // this._registerService.registration(register)
      // .pipe(takeUntil(this.unSubscribe$))
      // .subscribe({
      //   next:()=>{
      //     this._rout.navigate(['/'])
      //   }
      // })
  

    } else {
      Object.values(this.personalForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
