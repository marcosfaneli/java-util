import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { CommonModule } from '@angular/common';
import { RmpvDetalheProdutivoComponent } from './rmpv-detalhe-produtivo.component';
import { RmpvDetalheProdutivoFiltroComponent } from './rmpv-detalhe-produtivo-filtro/rmpv-detalhe-produtivo-filtro.component';
import { RmpvDetalheProdutivoListaComponent } from './rmpv-detalhe-produtivo-lista/rmpv-detalhe-produtivo-lista.component';
import { RmpvDetalheProdutivoServiceService } from './rmpv-detalhe-produtivo-service/rmpv-detalhe-produtivo-service.service';
import { Ng2OdometerModule } from 'ng2-odometer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ComumModule,
    Ng2OdometerModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [
    RmpvDetalheProdutivoComponent,
    RmpvDetalheProdutivoFiltroComponent,
    RmpvDetalheProdutivoListaComponent
  ],
   exports: [
    RmpvDetalheProdutivoComponent
  ],
  providers: [
    RmpvDetalheProdutivoServiceService
  ]
})
export class RmpvDetalheProdutivoModule { }
