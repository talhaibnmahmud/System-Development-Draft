import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ContactService } from '../services/contact.service';
import { CreateComponent } from './components/create/create.component';



@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent, AboutComponent, ContactComponent, DetailComponent, CreateComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ContactService, ],
  exports: [RouterModule],
})
export class FeatureModule { }
