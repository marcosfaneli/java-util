import { Component, OnInit, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { FormatarData } from '../../comum/formatarData';
import { FiltroDataComponent } from '../../comum/filtro-data/filtro-data.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rmpv-peca-mensal-filtro',
  templateUrl: './rmpv-peca-mensal-filtro.component.html',
  styleUrls: ['./rmpv-peca-mensal-filtro.component.css']
})

export class RmpvPecaMensalFiltroComponent implements OnInit {

  @Input() filtros: any;

  mercados = [];
  gruposEconomicos = [];
  regioes = [];
  regionais = [];
  dealers = [];
  funcao = [];

  Sysdate: FiltroDataComponent = new FiltroDataComponent;
  thisMonth; // Set the first Day of month
  max;       // Set a valid date
  parametrosFiltro: any;
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  habGrupoEconomico = false;
  habDealer         = false;
  habRegiao         = false;
  habRegional       = false;

  constructor(private peca: FiltroService, private route: ActivatedRoute) {
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
    this.preencherMercados();
    this.preencherGruposEconomicos();
    this.preencherRegioes();
    this.preencherRegionais();
    this.preencherDealers();
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

  set DataInicial(data) { this.filtros.data_inicial = this.getDataString(data); }
  get DataInicial(): string { return this.tratarGetDropDown(this.filtros.dataInicial); }

  set DataFinal(data) { this.filtros.data_final = this.getDataString(data); }
  get DataFinal(): string { return this.tratarGetDropDown(this.filtros.dataFinal); }

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

