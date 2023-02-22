import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/core';
import { PersonalDTO } from 'src/app/core/models/personalDTO';
import { trimRequiredValidator } from 'src/app/core/validators/trimRequired';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personalForm!: FormGroup;
  personal!: PersonalDTO


  constructor(
    private _fb: FormBuilder,
    private _personalService: PersonalService
  ) { }

  ngOnInit(): void {
    this.personal = this._personalService.getPersonal();
    this.formInit();

    this.personalForm.valueChanges
      .subscribe({
        next: () => {
          console.log('personal form', this.personalForm.valid);
          if (this.personalForm.valid) {
            this._personalService.setPersonal(new PersonalDTO(this.personalForm))
            this.personal = this._personalService.getPersonal();

          } else {
            Object.values(this.personalForm.controls).forEach(control => {
              if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
              }
            });
          }
        }
      })
  }


  formInit() {
    const email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.personalForm = this._fb.group({
      firstName: [this.personal?.firstName, [Validators.minLength(4), trimRequiredValidator()]],
      lastName: [this.personal?.lastName, [Validators.minLength(4), trimRequiredValidator()]],
      email: [this.personal?.email, [trimRequiredValidator(), Validators.pattern(email)]],

    });
  }

  getFormControlname(name: string, errore: string) {
    const isDirty = this.personalForm.get(name)?.dirty;
    const hasError = this.personalForm.get(name)?.hasError(errore);
    return isDirty && hasError
  }

}
