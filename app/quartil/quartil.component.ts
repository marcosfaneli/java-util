import { Component, OnInit } from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-quartil',
  templateUrl: './quartil.component.html'
})
export class QuartilComponent implements OnInit {

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
      let date = new Date(selecionado.registro.data_inicio);
      selecionado.registro.data_inicio = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
      date = new Date(selecionado.registro.data_fim);
      selecionado.registro.data_fim = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
    }
    this.selecionado = selecionado.registro;
  }

  definirFiltro() {
    $('#quartil-filtro').modal();
  }

}
