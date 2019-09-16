import { Component, OnInit} from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';
import { FormatarData } from '../comum/formatarData';
import { ActivatedRoute } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-rmpv-servico',
  templateUrl: './rmpv-servico.component.html',
  styleUrls: ['./rmpv-servico.component.css'],
})

export class RmpvServicoComponent implements OnInit {
  selecionado: object;
  state: Estado = Estado.view;
  filtros = {};

  parametrosFiltro: any;
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  constructor(private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
      this.parametrosFiltro = params;
      this.setaValorData(params['data_inicial'], params['data_final']);

      this.carregarFiltrosParametros();
    });

  }

  ngOnInit() {
  }

  setaValorData(dataInicial: Date, dataFinal: Date) {
    const dt = new Date();
    if (dataInicial === undefined || dataInicial.toString() === '') {
      const dt = new Date();
      const dataInicial = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': 1 };
      const dataInicialFormata = new FormatarData(dataInicial.year, dataInicial.month, dataInicial.day, 0, 0, 0).getDataString();
      this.InicialData = dataInicialFormata;
    } else {
      const now = new Date(dataInicial);
      this.InicialData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }

    if (dataFinal === undefined || dataFinal.toString() === '') {
      const dataFinal = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': dt.getUTCDate()};
      const dataFinalFormata = new FormatarData(dataFinal.year, dataFinal.month, dataFinal.day, 0, 0, 0).getDataString();
      this.FinalData = dataFinalFormata;
    } else {
      const now = new Date(dataFinal);
      this.FinalData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }

    this.filtros = { data_inicial: this.InicialData, data_final: this.FinalData };
  }

  carregarFiltrosParametros() {
    if (this.parametrosFiltro) {
      for (const item in this.parametrosFiltro) {
        if (this.parametrosFiltro.hasOwnProperty(item)) {

          this.filtros[item] = this.parametrosFiltro[item];
        }
      }
    }
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
    $('#rmpv-servico-filtro').modal();
  }

}
