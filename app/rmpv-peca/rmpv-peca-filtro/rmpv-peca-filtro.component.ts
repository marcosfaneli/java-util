import { Component, OnInit, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { FormatarData } from '../../comum/formatarData';
import { FiltroDataComponent } from '../../comum/filtro-data/filtro-data.component';

@Component({
  selector: 'app-rmpv-peca-filtro',
  templateUrl: './rmpv-peca-filtro.component.html',
  styleUrls: ['./rmpv-peca-filtro.component.css']
})

export class RmpvPecaFiltroComponent implements OnInit {

  @Input() filtros: any;
  mercados = [];
  gruposEconomicos = [];
  regioes = [];
  regionais = [];
  dealers = [];
  funcao = [];
  Sysdate: FiltroDataComponent = new FiltroDataComponent;
 
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  max;       // Set a valid date

  habGrupoEconomico = false;
  habDealer         = false;
  habRegiao         = false;
  habRegional       = false;

  constructor(private peca: FiltroService) {
    const max = new Date();
    this.max = { 'year': max.getFullYear(), 'month': max.getMonth() + 1, 'day': max.getUTCDate() };

    const firstData = new Date();
    this.InicialData = { 'year': firstData.getFullYear(), 'month': firstData.getMonth() + 1, 'day': 1 };
     
    const lastData = new Date();
    this.FinalData = { 'year': lastData.getFullYear(), 'month': lastData.getMonth() + 1, 'day': lastData.getDate() };

  }

  ngOnInit() {
    this.preencherMercados();
    this.preencherGruposEconomicos();
    this.preencherRegioes();
    this.preencherRegionais();
    this.preencherDealers();
  }

  preencherMercados() {
    this.peca.buscar('mercado')
      .then(r => { this.mercados = r.filtros; });
  }

  preencherGruposEconomicos() {
    this.peca.buscar('grupo_economico')
      .then(r => { this.gruposEconomicos = r.filtros; });
  }

  preencherRegioes() {
    this.peca.buscar('regiao')
      .then(r => { this.regioes = r.filtros; });
  }

  preencherRegionais() {
    this.peca.buscar('regional')
      .then(r => { this.regionais = r.filtros; });
  }

  preencherDealers() {
    this.peca.buscar('dealer')
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

