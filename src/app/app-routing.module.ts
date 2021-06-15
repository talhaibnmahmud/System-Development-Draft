import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './feature/components/about/about.component';
import { ContactComponent } from './feature/components/contact/contact.component';
import { CreateComponent } from './feature/components/create/create.component';
import { DetailComponent } from './feature/components/detail/detail.component';
import { HomeComponent } from './feature/components/home/home.component';
import { PageNotFoundComponent } from './feature/components/page-not-found/page-not-found.component';
import { SearchComponent } from './feature/components/search/search.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'house/:id', component: DetailComponent },
  { path: 'create', component: CreateComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
