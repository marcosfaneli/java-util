import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { UsuarioFabricaComponent } from './usuario-fabrica.component';
import { UsuarioFabricaCadastroComponent } from './usuario-fabrica-cadastro/usuario-fabrica-cadastro.component';
import { UsuarioFabricaListaComponent } from './usuario-fabrica-lista/usuario-fabrica-lista.component';
import { UsuarioFabricaService } from './usuario-fabrica-service/usuario-fabrica.service';
import { UsuarioFabricaFiltroComponent } from './usuario-fabrica-filtro/usuario-fabrica-filtro.component';

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
    UsuarioFabricaComponent
  ],
  declarations: [
    UsuarioFabricaComponent,
    UsuarioFabricaCadastroComponent,
    UsuarioFabricaListaComponent,
    UsuarioFabricaFiltroComponent
  ],
providers: [
  UsuarioFabricaService
]
})
export class UsuarioFabricaModule { }
