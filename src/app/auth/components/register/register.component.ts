import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this._fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required, Validators.email, Validators.minLength(8)],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly _authService: AuthService,
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

}
