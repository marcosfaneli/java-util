import { Component, OnInit} from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';
import { FormatarData } from '../comum/formatarData';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-rmpv-passagem',
  templateUrl: './rmpv-passagem.component.html',
  styleUrls: ['./rmpv-passagem.component.css'],
})

export class RmpvPassagemComponent implements OnInit {
  selecionado: object;
  state: Estado = Estado.view;
  filtros = {};
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  constructor() {}

  ngOnInit() {
    const dt = new Date();
    const dataInicial = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': 1 };
    const dataInicialFormata = new FormatarData(dataInicial.year, dataInicial.month, dataInicial.day, 0, 0, 0).getDataString();
    this.InicialData = dataInicialFormata;

    const dataFinal = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': dt.getUTCDate()};
    const dataFinalFormata = new FormatarData(dataFinal.year, dataFinal.month, dataFinal.day, 0, 0, 0).getDataString();
    this.FinalData = dataFinalFormata;

    this.filtros = { data_final:  this.FinalData, data_inicial: this.InicialData};
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
    $('#rmpv-passagem-filtro').modal();
  }

}
