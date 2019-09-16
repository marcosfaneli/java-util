import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-barra-consulta',
  templateUrl: './barra-consulta.component.html',
  styleUrls: ['./barra-consulta.component.css']
})

export class BarraConsultaComponent  implements OnInit {
  @Input() exibirBarraCor = true;
  @Input() exibirBotaoDefinirFiltros = true;
  @Input() exibirBotaoAjuda = true;
  @Input() exibirNovo = true;
  @Input() listagemComFiltros = false;
  @Output() inserindo   = new EventEmitter();
  @Output() atualizando = new EventEmitter();
  @Output() definirFiltro:    EventEmitter<any> = new EventEmitter<any>();
  @Input() detalhe: any = null;

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

}
