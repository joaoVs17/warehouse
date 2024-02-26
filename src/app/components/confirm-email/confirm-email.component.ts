import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ MatButton, HttpClientModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  providers: [AuthService],

})
export class ConfirmEmailComponent implements OnInit {

  token: string = this.route.snapshot.params['token'];


  constructor (private router: Router, private route: ActivatedRoute, private auth: AuthService) {

  }

  ngOnInit(): void {

    console.log(this.token);

    this.handleEmailConfirm(this.token);

  }

  handleEmailConfirm(token: string) {

    this.auth.confirmEmail(token).subscribe(
      res => {
        this.router.navigateByUrl('/signin?info=confirmedEmail');
      },
      error => {
        this.router.navigateByUrl('/');
      }
    );


  }



}
