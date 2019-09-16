import { BarraNotificacaoListaComponent } from './notificacao-lista/barra-notificacao-lista.component';
import { HistoricoFiltroComponent } from './notificacao-historico/historico-filtro/historico-filtro.component';
import { HistoricoListaComponent } from './notificacao-historico/historico-lista/historico-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum.module';
import {NotificacaoHistoricoComponent} from './notificacao-historico/notificacao-historico.component';
import {HistoricoService} from './notificacao-historico/historico-service/historico.service';
import { BarraNotificacaoService } from './barra-notificacao.service';
import { HistoricoCadastroComponent } from './notificacao-historico/historico-cadastro/historico-cadastro.component';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    ComumModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    NotificacaoHistoricoComponent,
    BarraNotificacaoListaComponent
  ],
  declarations: [
    BarraNotificacaoListaComponent,
    NotificacaoHistoricoComponent,
    HistoricoFiltroComponent,
    HistoricoListaComponent,
    HistoricoCadastroComponent
  ],
  providers: [
    HistoricoService,
    BarraNotificacaoService
  ]
})
export class BarraNotificacaoModule { }
