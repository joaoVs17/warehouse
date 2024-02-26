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

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from '../../interfaces/user.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
};

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule,FormsModule, MatFormFieldModule, MatButton, MatInputModule, ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
  providers: [AuthService],
})
export class SigninFormComponent implements OnInit {

  emailFormControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordFormControl = new FormControl(null, [Validators.required]);

  matcher = new MyErrorStateMatcher()

  loginForm: FormGroup = this.formBuilder.group({
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.createLoginForm();
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      'email': this.emailFormControl,
      'password': this.passwordFormControl
    })
  };

  onHandleLogin(post: any) {
    console.log(post);

    this.auth.loginUser(post).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}
