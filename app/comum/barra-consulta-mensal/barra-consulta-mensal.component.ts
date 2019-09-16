import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-barra-consulta-mensal',
  templateUrl: './barra-consulta-mensal.component.html',
  styleUrls: ['./barra-consulta-mensal.component.css']
})
export class BarraConsultaMensalComponent implements OnInit {

  @Input() exibirBarraCor = true;
  @Input() exibirBotaoDefinirFiltros = true;
  @Input() exibirBotaoAjuda = true;
  @Input() exibirBotaoVoltar = true;
  @Input() exibirNovo = true;
  @Input() listagemComFiltros = false;
  @Output() inserindo   = new EventEmitter();
  @Output() atualizando = new EventEmitter();
  @Output() definirFiltro:    EventEmitter<any> = new EventEmitter<any>();
  @Input() detalhe: any = null;
  @Output() voltando = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  buscarRegistros() {
    this.atualizando.emit(true);
  }

  criar() {
    this.inserindo.emit(true);
  }

  definirFiltragem() {
    this.definirFiltro.emit();
  }

  voltar() {
    this.voltando.emit(null);
  }

}
