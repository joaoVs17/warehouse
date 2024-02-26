import { FormGroup, ValidatorFn } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export function checkEmailExists(msg: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (msg == "This email already exists" ) {
            return {emailAlreadyExists: true};
        }
        return null;
    }
}