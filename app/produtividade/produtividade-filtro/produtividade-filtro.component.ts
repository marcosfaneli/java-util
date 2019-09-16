import { Component, OnInit, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { FormatarData } from '../../comum/formatarData';
import { FiltroDataComponent } from '../../comum/filtro-data/filtro-data.component';

@Component({
  selector: 'app-produtividade-filtro',
  templateUrl: './produtividade-filtro.component.html',
  styleUrls: ['./produtividade-filtro.component.css']
})
export class ProdutividadeFiltroComponent implements OnInit {

  @Input() filtros: any;

  gruposEconomicos = [];
  regioes = [];
  dealers = [];
  Sysdate: FiltroDataComponent = new FiltroDataComponent;
 
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  max;       // Set a valid date

  constructor(private servico: FiltroService) {

    const max = new Date();
    this.max = { 'year': max.getFullYear(), 'month': max.getMonth() + 1, 'day': max.getUTCDate() };

    const firstData = new Date();
    this.InicialData = { 'year': firstData.getFullYear(), 'month': firstData.getMonth() + 1, 'day': 1 };
     
    const lastData = new Date();
    this.FinalData = { 'year': lastData.getFullYear(), 'month': lastData.getMonth() + 1, 'day': lastData.getDate() };

  }

  ngOnInit() {
    this.preencherGruposEconomicos();
    this.preencherRegioes();
    this.preencherDealers();
  }


  preencherGruposEconomicos() {
    this.servico.buscar('grupo_economico')
      .then(r => { this.gruposEconomicos = r.filtros; });
  }

  preencherRegioes() {
    this.servico.buscar('regiao')
      .then(r => { this.regioes = r.filtros; });
  }

  preencherDealers() {
    this.servico.buscar('dealer')
      .then(r => { this.dealers = r.filtros; });
  }

  set GrupoEconomico(id: string) { this.filtros.grupo_economico = this.tratarSetDropDown(id); }
  get GrupoEconomico(): string { return this.tratarGetDropDown(this.filtros.grupo_economico); }

  set Regiao(id: string) { this.filtros.regiao = this.tratarSetDropDown(id); }
  get Regiao(): string { return this.tratarGetDropDown(this.filtros.regiao); }

  set Dealer(id: string) { this.filtros.dealer = this.tratarSetDropDown(id); }
  get Dealer(): string { return this.tratarGetDropDown(this.filtros.dealer); }

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

}

