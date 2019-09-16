import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { RegionalComponent } from './regional.component';
import { RegionalCadastroComponent } from './regional-cadastro/regional-cadastro.component';
import { RegionalListaComponent } from './regional-lista/regional-lista.component';
import { RegionalService } from './regional-service/regional.service';
import { RegionalFiltroComponent } from './regional-filtro/regional-filtro.component';

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
    RegionalComponent
  ],
  declarations: [
    RegionalComponent,
    RegionalCadastroComponent,
    RegionalListaComponent,
    RegionalFiltroComponent
  ],
providers: [
  RegionalService
]
})
export class RegionalModule { }
