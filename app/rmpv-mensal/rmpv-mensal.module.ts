import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RmpvMensalComponent } from './rmpv-mensal.component';
import { ComumModule } from '../comum/comum.module';
import { RmpvMensalService } from './service/rmpv-mensal.service';
import { RmpvMensalFiltroComponent } from './rmpv-mensal-filtro/rmpv-mensal-filtro.component';

@NgModule({
  imports: [
    CommonModule,
    ComumModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ComumModule,
    ChartsModule,
    Ng2OdometerModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    RmpvMensalService
  ],
  exports:[
    RmpvMensalComponent
  ],
  declarations: [
    RmpvMensalComponent,
    RmpvMensalFiltroComponent
  ]
})
export class RmpvMensalModule { }
