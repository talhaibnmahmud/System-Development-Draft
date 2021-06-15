import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HouseService } from './services/house.service';
import { FeatureModule } from './feature/feature.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    FeatureModule,
    AppRoutingModule,
  ],
  providers: [HouseService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
