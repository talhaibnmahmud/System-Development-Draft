import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ContactService } from '../services/contact.service';



@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent, AboutComponent, ContactComponent, DetailComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [ContactService, ],
  exports: [RouterModule],
})
export class FeatureModule { }
