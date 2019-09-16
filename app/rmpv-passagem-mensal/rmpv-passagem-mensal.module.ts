import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComumModule } from '../comum/comum.module';
import { RmpvPassagemMensalComponent } from './rmpv-passagem-mensal.component';
import { RmpvPassagemMensalService } from './service/rmpv-passagem-mensal.service';
import { RmpvPassagemMensalFiltroComponent } from './rmpv-passagem-mensal-filtro/rmpv-passagem-mensal-filtro.component';

@NgModule({
  imports: [
    CommonModule,
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
    RmpvPassagemMensalService
  ],
  declarations: [
    RmpvPassagemMensalComponent,
    RmpvPassagemMensalFiltroComponent
  ]
})
export class RmpvPassagemMensalModule { }
