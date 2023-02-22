import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestsService } from 'src/app/core';
import { PersonalDTO } from 'src/app/core/models/personalDTO';
import { trimRequiredValidator } from 'src/app/core/validators/trimRequired';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {
  guestsDTO!: PersonalDTO[]
  guestForm!: FormGroup;
  email = /^[a-zA-Z0-9.!#$%&’*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  constructor(
    private _fb: FormBuilder,
    private _guestsService: GuestsService
  ) { }


  ngOnInit(): void {
    this.formInit();
    this.guestForm.valueChanges
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.guestForm.controls['guests'].value)
          if (this.guestForm.valid) {
            this._guestsService.setGuest(this.guestForm.controls['guests'].value)
            this.guestsDTO = this._guestsService.getGuest();

          } else {
            Object.values(this.guestForm.controls).forEach(control => {
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
    this.guestForm = this._fb.group({
      guests: this._fb.array([this.newGuest()]),
    });
  }

  get guests(): FormArray {
    return this.guestForm.get('guests') as FormArray
  }


  newGuest(): FormGroup {
    return this._fb.group({
      firstName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      lastName: ['', [Validators.minLength(4), trimRequiredValidator()]],
      email: ['', [trimRequiredValidator(), Validators.pattern(this.email)]],
    })
  }


  getFormControlname(name: string, errore: string) {
    const isDirty = this.guestForm.get(name)?.dirty;
    const hasError = this.guestForm.get(name)?.hasError(errore);
    return isDirty && hasError
  }

  addSkills() {
    this.guests.push(this.newGuest())
  }

  removeSkill(i: number) {
    this.guests.removeAt(i);
  }
}

