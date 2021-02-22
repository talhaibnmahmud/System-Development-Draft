import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';



@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent, AboutComponent, ContactComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [RouterModule],
})
export class FeatureModule { }
