import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { GrupoImportadorComponent } from './grupo-importador.component';
import { GrupoImportadorListaComponent } from './grupo-importador-lista/grupo-importador-lista.component';
import { GrupoImportadorCadastroComponent } from './grupo-importador-cadastro/grupo-importador-cadastro.component';
import { GrupoImportadorService } from './grupo-importador-service/grupo.importador.service';
import { GrupoImportadorFiltroComponent } from './grupo-importador-filtro/grupo-importador-filtro.component';

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
    GrupoImportadorComponent
  ],
  declarations: [
    GrupoImportadorComponent,
    GrupoImportadorListaComponent,
    GrupoImportadorCadastroComponent,
    GrupoImportadorFiltroComponent
  ],
  providers: [
    GrupoImportadorService
  ]
})
export class GrupoImportadorModule { }
