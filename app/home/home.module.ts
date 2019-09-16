import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { HomeService } from './home-service/home.service';
import { ComumModule } from '../comum/comum.module';

@NgModule({
  imports: [
    ComumModule,
    CommonModule,
    ChartsModule,
    Ng2OdometerModule.forRoot()
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
