import { Component, OnInit } from '@angular/core';
import { Estado } from '../../shared/estado.enum';
import { RetornoSelecao } from './../../../comum/gridview/RetornoSelecao';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-notificacao-historico',
  templateUrl: './notificacao-historico.component.html',
  styleUrls: ['./notificacao-historico.component.css']
})
export class NotificacaoHistoricoComponent implements OnInit {

  selecionado: object;
  state: Estado = Estado.view;

  filtros = {};

  constructor() { }

  ngOnInit() {
  }


  buscar() {
    this.selecionado = undefined;
    this.state = Estado.view;
  }

  selecionar(selecionado: RetornoSelecao) {
    if (selecionado.novoCadastro) {
      this.state = Estado.insert;
    } else {
      this.state = Estado.view;
    }
    this.selecionado = selecionado.registro;
  }

  definirFiltro() {
    $('#historico-filtro-notificacao').modal();
  }

}
