import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from '../comum/comum.module';
import { DealerComponent } from './dealer.component';
import { DealerService } from './dealer-service/dealer.service';
import { DealerListaComponent } from './dealer-lista/dealer-lista.component';
import { DealerCadastroComponent } from './dealer-cadastro/dealer-cadastro.component';
import { DealerFiltroComponent } from './dealer-filtro/dealer-filtro.component';


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
    DealerComponent
  ],
  declarations: [
    DealerComponent,
    DealerListaComponent,
    DealerCadastroComponent,
    DealerFiltroComponent
  ],
  providers: [
    DealerService
  ]
})
export class DealerModule { }
