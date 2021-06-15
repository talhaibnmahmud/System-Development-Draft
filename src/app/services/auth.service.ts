import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/helper/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginURL = 'http://127.0.0.1:8000/user/auth/login/';
  private readonly registerURL = 'http://127.0.0.1:8000/user/auth/register/';

  private loginObservable: any;
  private registerObservable: any;
  isLoggedIn = true;

  constructor(private _httpClient: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    this.loginObservable = this._httpClient.post(this.loginURL, {
      username: username,
      password: password
    });

    this.isLoggedIn = true;
    return this.loginObservable;
  }

  register(): void {

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');

    this.isLoggedIn = false;
  }

  checkLoggedIn(): void {
    const expiry = localStorage.getItem('expiry');
    const token = localStorage.getItem('token');
    const now = new Date();

    if (!expiry || !token) {
      this.isLoggedIn = false;
      return;
    }

    if (expiry) {
      const expiry_date = new Date(expiry);
      if (now > expiry_date) {
        this.isLoggedIn = false;
        return;
      }
    }

    if (token && token.length !== 64) {
      this.isLoggedIn = false;
    }
  }
}
