import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { UsuarioDealerComponent } from './usuario-dealer.component';
import { UsuarioDealerCadastroComponent } from './usuario-dealer-cadastro/usuario-dealer-cadastro.component';
import { UsuarioDealerListaComponent } from './usuario-dealer-lista/usuario-dealer-lista.component';
import { UsuarioDealerService } from './usuario-dealer-service/usuario-dealer.service';
import { UsuarioDealerFiltroComponent } from './usuario-dealer-filtro/usuario-dealer-filtro.component';

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
    UsuarioDealerComponent
  ],
  declarations: [
    UsuarioDealerComponent,
    UsuarioDealerCadastroComponent,
    UsuarioDealerListaComponent,
    UsuarioDealerFiltroComponent
  ],
providers: [
  UsuarioDealerService
]
})
export class UsuarioDealerModule { }
