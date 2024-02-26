import { FormGroup, ValidatorFn } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export const passwordsDontMatch: ValidatorFn = (control: AbstractControl,
): ValidationErrors | null => {
    
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    console.log(password?.value);
    console.log(confirm_password?.value);

    if (password && confirm_password && password?.value && confirm_password?.value && password?.value != confirm_password?.value) {
        return { mismatch: true}
    }

    return null;

  };