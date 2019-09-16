import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { FuncaoComponent } from './funcao.component';
import { FuncaoCadastroComponent } from './funcao-cadastro/funcao-cadastro.component';
import { FuncaoListaComponent } from './funcao-lista/funcao-lista.component';
import { FuncaoService } from './funcao-service/funcao.service';
import { FuncaoFiltroComponent } from './funcao-filtro/funcao-filtro.component';

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
    FuncaoComponent
  ],
  declarations: [
    FuncaoComponent,
    FuncaoCadastroComponent,
    FuncaoListaComponent,
    FuncaoFiltroComponent
  ],
providers: [
  FuncaoService
]
})
export class FuncaoModule { }
