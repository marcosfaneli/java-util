import { Component, OnInit, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { FormatarData } from '../../comum/formatarData';
import { FiltroDataComponent } from '../../comum/filtro-data/filtro-data.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rmpv-detalhe-produtivo-filtro',
  templateUrl: './rmpv-detalhe-produtivo-filtro.component.html',
  styleUrls: ['./rmpv-detalhe-produtivo-filtro.component.css']
})
export class RmpvDetalheProdutivoFiltroComponent implements OnInit {

  @Input() filtros: any;

  dealer;
  produtivos = [];
  Sysdate: FiltroDataComponent = new FiltroDataComponent;
  // today = this.mesCorrente(this.today);
  thisMonth; // Set the first Day of month
  max;       // Set a valid date
  parametrosFiltro: any;
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query


  constructor(private servico: FiltroService, private route: ActivatedRoute) {
    let dataInicial: any = 0;
    let dataFinal: any = 0;
    this.route.queryParams.subscribe(params => {
      this.parametrosFiltro = params;
      dataInicial = params['data_inicial'];
      if (dataInicial === undefined || dataInicial === '' || dataInicial === 'NaN') {
        const firstData = new Date();
        this.InicialData = { 'year': firstData.getFullYear(), 'month': firstData.getMonth() + 1, 'day': 1 };
        this.filtros = { 'data_inicial': this.InicialData };
      } else {
        const now = new Date(dataInicial);
        this.InicialData = { 'year': now.getFullYear(), 'month': now.getMonth() + 1, 'day': now.getUTCDate() };
        this.filtros = { data_inicial: this.InicialData };
      }

      dataFinal = params['data_final'];
      if (dataFinal === undefined || dataFinal === '' || dataFinal === 'NaN') {
        const FinalData = new Date();
        this.FinalData = { 'year': FinalData.getFullYear(), 'month': FinalData.getMonth() + 1, 'day': FinalData.getDate() };
        this.filtros = { 'data_final': this.FinalData };
      } else {
        const now = new Date(dataFinal);
        this.FinalData = { 'year': now.getFullYear(), 'month': now.getMonth() + 1, 'day': now.getUTCDate() };
        this.filtros = { data_final: this.FinalData };
      }
    });

    const max = new Date();
    this.max = { 'year': max.getFullYear(), 'month': max.getMonth() + 1, 'day': max.getUTCDate() };
  }

  ngOnInit() {
    this.preencherDealer();
 //   this.preencherProdutivo();
   this.carregarFiltrosParametros();
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


  preencherDealer() {
    this.servico.buscar('dealer')
      .then(r => { this.dealer = r.filtros; });
  }

  preencherProdutivo() {
    this.servico.buscar('produtivos')
      .then(r => { this.produtivos = r.filtros; });
  }

  set Dealer(id: string) { this.filtros.dealer = this.tratarSetDropDown(id); }
  get Dealer(): string { return this.tratarGetDropDown(this.filtros.dealer); }

  set Produtivos(id: string) { this.filtros.produtivos = this.tratarSetDropDown(id); }
  get Produtivos(): string { return this.tratarGetDropDown(this.filtros.produtivos); }

  tratarSetDropDown(id: string): number {
    if (id) {
      return +id;
    } else {
      return null;
    }
  }

  tratarGetDropDown(selecionado: any): string {
    if (selecionado === null || selecionado === undefined) {
      return '';
    }
    return selecionado;
  }

  set dataInicial(data) {
    this.filtros.data_inicial = this.getDataString(data);
  }

  limparDataInicial(dataInicialView) {
    dataInicialView._elRef.nativeElement.value = '';
    this.filtros.data_inicial = '';
  }

  set dataFinal(data) {
    this.filtros.data_final = this.getDataString(data);
  }

  limparDataFinal(dataFinalView) {
    dataFinalView._elRef.nativeElement.value = '';
    this.filtros.data_final = '';
  }

  getDataString(data): any {
    return new FormatarData(
      data.year,
      data.month,
      data.day,
      0,
      0,
      0
    ).getDataString();
  }

}

