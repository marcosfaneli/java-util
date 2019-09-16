import { Component, OnInit, Input } from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RmpvDetalheProdutivoServiceService } from './rmpv-detalhe-produtivo-service/rmpv-detalhe-produtivo-service.service';

export let ocultaBotao = true;
declare var $: any;

@Component({
  selector: 'app-rmpv-detalhe-produtivo',
  templateUrl: './rmpv-detalhe-produtivo.component.html',
  styleUrls: ['./rmpv-detalhe-produtivo.component.css']
})
export class RmpvDetalheProdutivoComponent implements OnInit {
  selecionado: object;
  state: Estado = Estado.view;
  dealer: string;
  parametrosFiltro: any;

  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  @Input() filtros = {};

  constructor(service: RmpvDetalheProdutivoServiceService, toast: ToastrService, router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.parametrosFiltro = params;
    this.setaValorData(params['data_inicial'], params['data_final']);
  });

  }

  ngOnInit() {
  }

  setaValorData(dataInicial: Date, dataFinal: Date) {
    if (dataInicial === undefined || dataInicial.toString() === '') {
      const firstData = new Date();
      this.InicialData = firstData.getFullYear() + '-' + ("0" + (firstData.getMonth() + 1)).slice(-2) + '-' + '01';
    } else {
      const now = new Date(dataInicial);
      this.InicialData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }

    if (dataFinal === undefined || dataFinal.toString() === '') {
      const lastData = new Date();
      this.FinalData = lastData.getFullYear() + '-' + ("0" + (lastData.getMonth() + 1)).slice(-2) + '-' + lastData.getUTCDate();
    } else {
      const now = new Date(dataFinal);
      this.FinalData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }

    this.filtros = { data_inicial: this.InicialData, data_final: this.FinalData };
  }

  buscar() {
    this.selecionado = undefined;
    this.state = Estado.view;
  }

  selecionar(selecionado: RetornoSelecao) {
  }

  definirFiltro() {
    $('#detalhe-produtivo-filtro').modal();
  }

}
