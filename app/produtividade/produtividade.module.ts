import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { ProdutividadeComponent } from './produtividade.component';
import { ProdutividadeListaComponent } from './produtividade-lista/produtividade-lista.component';
import { ProdutividadeService } from './produtividade-service/produtividade.service';
import { ProdutividadeFiltroComponent } from './produtividade-filtro/produtividade-filtro.component';
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
  exports: [
    ProdutividadeComponent
  ],
  declarations: [
    ProdutividadeComponent,
    ProdutividadeListaComponent,
    ProdutividadeFiltroComponent
  ],
  providers: [
    ProdutividadeService
  ]
})
export class ProdutividadeModule { }
