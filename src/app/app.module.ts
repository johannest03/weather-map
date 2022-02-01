import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { FlexLayoutModule } from '@angular/flex-layout';

=======
>>>>>>> d007415ba942706b78bd2598203ceeef698075c0
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './shared/weather.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StationDetailComponent } from './station-detail/station-detail.component';


import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatTabsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
