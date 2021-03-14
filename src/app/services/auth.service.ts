import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/helper/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginURL = 'http://127.0.0.1:8000/user/auth/login/';

  private loginObservable: any;

  constructor(private _httpClient: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    this.loginObservable = this._httpClient.post(this.loginURL, {
      username: username,
      password: password
    });

    return this.loginObservable;
  }
}
