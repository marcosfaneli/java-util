import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDealerCadastroComponent } from './tipo-dealer-cadastro/tipo-dealer-cadastro.component';
import { TipoDealerListaComponent } from './tipo-dealer-lista/tipo-dealer-lista.component';
import { TipoDealerComponent } from './tipo-dealer.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { TipoDealerService } from './tipo-dealer-service/tipo.dealer.service';
import { TipoDealerFiltroComponent } from './tipo-dealer-filtro/tipo-dealer-filtro.component';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ComumModule
  ],
  exports: [
    TipoDealerComponent
  ],
  declarations: [
    TipoDealerComponent,
    TipoDealerListaComponent,
    TipoDealerCadastroComponent,
    TipoDealerFiltroComponent
  ],
  providers: [
    TipoDealerService
  ]
})
export class TipoDealerModule { }
