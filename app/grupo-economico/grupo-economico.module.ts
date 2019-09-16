import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { GrupoEconomicoComponent } from './grupo-economico.component';
import { GrupoEconomicoCadastroComponent } from './grupo-economico-cadastro/grupo-economico-cadastro.component';
import { GrupoEconomicoListaComponent } from './grupo-economico-lista/grupo-economico-lista.component';
import { GrupoEconomicoService } from './grupo-economico-service/grupo.economico.service';
import { GrupoEconomicoFiltroComponent } from './grupo-economico-filtro/grupo-economico-filtro.component';

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
    GrupoEconomicoComponent
  ],
  declarations: [
    GrupoEconomicoComponent,
    GrupoEconomicoCadastroComponent,
    GrupoEconomicoListaComponent,
    GrupoEconomicoFiltroComponent
  ],
providers: [
  GrupoEconomicoService
]
})
export class GrupoEconomicoModule { }
