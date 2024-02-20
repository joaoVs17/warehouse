import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  FormsModule,  
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule, } from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, MatFormFieldModule, MatButton, MatInputModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  recovery_email = '';
  phone: string = '';
  password: string = '';
  confirm_password: string = '';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

}
