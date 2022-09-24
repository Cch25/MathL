import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinearInterpolationModule } from './linear-interpolation/linear-interpolation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LinearInterpolationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
