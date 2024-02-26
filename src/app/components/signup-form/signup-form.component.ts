import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  FormsModule,  
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
  FormGroup, 
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors} from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';

import { passwordsDontMatch } from '../../shared/passwords_dont_match.directive';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from '../../interfaces/user.interface';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = !!(form && form.submitted);
      const controlTouched = !!(control && (control.dirty || control.touched));
      const controlInvalid = !!(control && control.invalid);
      const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

      return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}

export function confirmPasswordMatcher(passwordControl: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = passwordControl.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword && password && confirmPassword) {
      return { mismatch: true };
    }

    return null;
  };
}


@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule,FormsModule, MatFormFieldModule, MatButton, MatInputModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  providers: [AuthService]
})
export class SignupFormComponent implements OnInit {

  firstNameFormControl = new FormControl(null, [Validators.required]);
  lastNameFormControl = new FormControl(null, [Validators.required]);
  emailFormControl = new FormControl(null, [Validators.required, Validators.email]);
  recoveryEmailFormControl = new FormControl(null, [Validators.required, Validators.email]);
  phoneFormControl = new FormControl(null, [Validators.required]);
  passwordFormControl = new FormControl(null, [Validators.required]);
  confirmPasswordFormControl = new FormControl(null, [Validators.required, confirmPasswordMatcher(this.passwordFormControl)]);

  matcher = new MyErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();

  userForm: FormGroup = this.formBuilder.group({
  });

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
      this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      'first_name': this.firstNameFormControl,
      'last_name': this.lastNameFormControl,
      'email': this.emailFormControl,
      'recovery_email': this.recoveryEmailFormControl,
      'password': this.passwordFormControl,
      'confirm_password': this.confirmPasswordFormControl,
    },
    {
      validators: passwordsDontMatch
    } 
    );
  }

  verifyPasswordsMatch() {
    return this.userForm.hasError('mismatch');
  }

  onSaveUser(post: UserInterface) {
    //debugger;
    
    console.log(post);
    this.auth.testFunc(post); 
    this.auth.getAllUsers().subscribe(res => {
      console.log(res);
    })

    this.auth.registerUserRetrieveMessage(post).subscribe((res) => {
      console.log(res);
    }, error => {
      console.log(error.error);
      if (error.error.msg == "This email already exists") {
        this.router.navigateByUrl('/signin?info=existingUserSignupAttempt');
      }
    });


  }



}
