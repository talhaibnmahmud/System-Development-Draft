import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '../helper/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly contactURL = 'http://127.0.0.1:8000/contact/';
  private contact: any;

  constructor(private readonly _httpClient: HttpClient) { }

  submitContact(form: any): Observable<Contact> {
    this.contact = this._httpClient.post(this.contactURL, form);

    return this.contact;
  }
}
