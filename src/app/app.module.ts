import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonsModule } from 'src/commons/commons.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from 'src/commons/services/auth.service';
import { HomeComponent } from './home/home.component';
import { ShipsListComponent } from './ships/ships-list/ships-list.component';
import { ShipDetailsComponent } from './ships/ship-details/ship-details.component';
import { ScheduleTableComponent } from './ships/schedule-table/schedule-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShipsListComponent,
    ShipDetailsComponent,
    ScheduleTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
