import { FormGroup } from "@angular/forms";

export class PersonalDTO {
    email!: string;
    firstName!: string;
    lastName!: string;
    constructor(personalForm: FormGroup) {
        this.email = personalForm.get('email')?.value;
        this.firstName = personalForm.get('firstName')?.value;
        this.lastName = personalForm.get('lastName')?.value;
    }

}