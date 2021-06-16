import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  loading = false;
  success = false;

  name = '';
  company = '';
  email = '';
  phone = '';
  message = '';

  constructor(private readonly _contactService: ContactService) { }

  ngOnInit(): void {
  }

  submitHandler(form: NgForm) {
    if (form.valid) {
      try {
        this.loading = true;
        this._contactService.submitContact(form.value).subscribe();
        this.success = true;
        // console.log(form.value);
      } catch (error) {
        // console.log(error);
      }

      this.loading = false;
    }
  }

}
