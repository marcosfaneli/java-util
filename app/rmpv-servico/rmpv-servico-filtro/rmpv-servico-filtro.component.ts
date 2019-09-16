import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { FormatarData } from '../../comum/formatarData';
import { FiltroDataComponent } from '../../comum/filtro-data/filtro-data.component';

@Component({
  selector: 'app-rmpv-servico-filtro',
  templateUrl: './rmpv-servico-filtro.component.html',
  styleUrls: ['./rmpv-servico-filtro.component.css']
})

export class RmpvServicoFiltroComponent implements OnInit {

  @Input() filtros: any;
  mercado = [];
  gruposEconomicos = [];
  regioes = [];
  regionais = [];
  dealers = [];
  funcao = [];
  Sysdate: FiltroDataComponent = new FiltroDataComponent;
  InicialData; // Set the first Day of month
  dataInicialFormata;
  FinalData; // set the last day of query
  dataFinalFormata;

  max;       // Set a valid date

  habGrupoEconomico = false;
  habDealer         = false;
  habRegiao         = false;
  habRegional       = false;

  parametrosFiltro: any;

  constructor(private servico: FiltroService, router: Router, private route: ActivatedRoute) {

    const max = new Date();
    this.max = { 'year': max.getFullYear(), 'month': max.getMonth() + 1, 'day': max.getUTCDate() };

      this.route.queryParams.subscribe(params => {
      this.parametrosFiltro = params;
      this.setaValorData(params['data_inicial'], params['data_final']);
      });

  }
 
  ngOnInit() {
    this.preencherMercados();
    this.preencherGruposEconomicos();
    this.preencherRegioes();
    this.preencherRegionais();
    this.preencherDealers();
  }

  setaValorData(dataInicial: Date, dataFinal: Date) {
    const dt = new Date();
    if (dataInicial === undefined || dataInicial.toString() === '') {
      const dt = new Date();
      const dataInicial = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': 1 };
      this.dataInicialFormata = new FormatarData(dataInicial.year, dataInicial.month, dataInicial.day, 0, 0, 0).getDataString();
      this.InicialData = dataInicial;
    } else {
      const now = new Date(dataInicial);
      this.InicialData = {'year': now.getUTCFullYear(), 'month': now.getMonth() + 1, 'day': now.getDate() };
    }

    if (dataFinal === undefined || dataFinal.toString() === '') {
      const dataFinal = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': dt.getUTCDate()};
      this.dataFinalFormata = new FormatarData(dataFinal.year, dataFinal.month, dataFinal.day, 0, 0, 0).getDataString();
      this.FinalData = dataFinal;
    } else {
      const now = new Date(dataFinal);
      //this.dataFinalFormata = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
      this.FinalData = {'year': now.getUTCFullYear(), 'month': now.getMonth() + 1, 'day': now.getDate() };
    }

    this.filtros = { data_inicial: this.InicialData, data_final: this.FinalData };
  }
 
  preencherMercados() {
    this.servico.buscar('mercado')
      .then(r => { this.mercado = r.filtros; });
  }

  preencherGruposEconomicos() {
    this.servico.buscar('grupo_economico')
      .then(r => { this.gruposEconomicos = r.filtros; });
  }

  preencherRegioes() {
    this.servico.buscar('regiao')
      .then(r => { this.regioes = r.filtros; });
  }

  preencherRegionais() {
    this.servico.buscar('regional')
      .then(r => { this.regionais = r.filtros; });
  }

  preencherDealers() {
    this.servico.buscar('dealer')
      .then(r => { this.dealers = r.filtros; });
  }


  set Mercado(id: string) { this.filtros.mercado = this.tratarSetDropDown(id); }
  get Mercado(): string { return this.tratarGetDropDown(this.filtros.mercado); }

  set GrupoEconomico(id: string) { this.filtros.grupo_economico = this.tratarSetDropDown(id); }
  get GrupoEconomico(): string { return this.tratarGetDropDown(this.filtros.grupo_economico); }

  set Regiao(id: string) { this.filtros.regiao = this.tratarSetDropDown(id); }
  get Regiao(): string { return this.tratarGetDropDown(this.filtros.regiao); }

  set Regional(id: string) { this.filtros.regional = this.tratarSetDropDown(id); }
  get Regional(): string { return this.tratarGetDropDown(this.filtros.regional); }

  set Dealer(id: string) { this.filtros.dealer = this.tratarSetDropDown(id); }
  get Dealer(): string { return this.tratarGetDropDown(this.filtros.dealer); }

  set Funcao(id: string) { this.filtros.funcao = this.tratarSetDropDown(id); }
  get Funcao(): string { return this.tratarGetDropDown(this.filtros.funcao); }

  set DataInicial(data) { this.filtros.data_inicial = this.getDataString(data);  }
  get DataInicial(): string {return this.tratarGetDropDown(this.filtros.data_inicial); }

  set DataFinal(data) { this.filtros.data_final = this.getDataString(data);  }
  get DataFinal(): string {return this.tratarGetDropDown(this.filtros.data_final); }

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

  set dataFinal(data) {
    this.filtros.data_final = this.getDataString(data);
  }

  limparDataInicial(dataInicialView) {
    dataInicialView._elRef.nativeElement.value = '';
    this.filtros.data_inicial = '';
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

  desabilitaDealer() {
    if (this.GrupoEconomico !== '') {
        this.habDealer = true;
    } else {
      this.habDealer = false;
    }
  }

  desabilitaGrupoEconomico() {
    if (this.Dealer !== '') {
        this.habGrupoEconomico = true;
    } else {
      this.habGrupoEconomico = false;
    }
  }

  desabilitaRegional() {
    if (this.Regiao !== '') {
        this.habRegional = true;
    } else {
      this.habRegional = false;
    }
  }

  desabilitaRegiao() {
    if (this.Regional !== '') {
        this.habRegiao = true;
    } else {
      this.habRegiao = false;
    }
  }

}

