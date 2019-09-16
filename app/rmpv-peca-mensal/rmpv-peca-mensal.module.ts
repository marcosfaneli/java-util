import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RmpvPecaMensalComponent } from './rmpv-peca-mensal.component';
import { ComumModule } from '../comum/comum.module';
import { RmpvPecaMensalService } from './service/rmpv-peca-mensal.service';
import { RmpvPecaMensalFiltroComponent } from './rmpv-peca-mensal-filtro/rmpv-peca-mensal-filtro.component';

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
    RmpvPecaMensalService
  ],
  declarations: [
    RmpvPecaMensalComponent,
    RmpvPecaMensalFiltroComponent
  ]
})
export class RmpvPecaMensalModule { }
