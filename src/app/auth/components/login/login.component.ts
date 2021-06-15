import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from 'src/app/helper/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private credentials: Token | undefined;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // console.log('Submitting Data');
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.status);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(
      data => {
        this.credentials = { ...data };
        this.setCredentials(this.credentials);

        this.router.navigate(['']);
      }
    );
  }


  private setCredentials(credentials: any) {
    localStorage.setItem('expiry', credentials.expiry);
    localStorage.setItem('token', credentials.token);
  }
}
