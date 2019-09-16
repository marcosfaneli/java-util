import { Component, OnInit, Input } from '@angular/core';
// import { FiltroService } from '../comum/filtro/filtro.service';
import { FiltroTipoOs } from './rmpv-detalhado-filtro/filtro-tipo-os';
import { FiltroDealers } from './rmpv-detalhado-filtro/filtro-dealer';
import { FiltroMarcas } from './rmpv-detalhado-filtro/filtro-marcas';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';
import { RmpvDetalhadoFiltroService } from './rmpv-detalhado-filtro/rmpv-detalhado-filtro.service';
import { FormatarData } from '../comum/formatarData';
// import { RmpvDetalhadoFiltroComponent } from './rmpv-detalhado-filtro/rmpv-detalhado-filtro.component';

declare var $: any;

@Component({
  selector: 'app-rmpv-detalhado',
  templateUrl: './rmpv-detalhado.component.html',
  styleUrls: ['./rmpv-detalhado.component.css']
})

export class RmpvDetalhadoComponent implements OnInit {
  filtros: any = {};
  carregando: boolean;
  selecionado: object;
  selecionados = [];
  filtroMarcas: FiltroMarcas;
  filtroTipoOs: FiltroTipoOs;
  filtroDealers: FiltroDealers;
  idOs: any;

  constructor(private servico: RmpvDetalhadoFiltroService) {
    this.filtroMarcas = new FiltroMarcas(this.servico);
    this.filtroDealers = new FiltroDealers(this.servico);
    this.filtroTipoOs = new FiltroTipoOs(this.servico);
    this.carregarFiltroVazio();
  }

  ngOnInit() {
    this.carregando = true;

    this.filtroMarcas.carregar();
    this.filtroTipoOs.carregar();
    this.filtroDealers.carregar();
  }

  carregarFiltroVazio() {
    this.filtros.grupo_economico = null;
    this.filtros.data_inicial = null;
    this.filtros.data_final = null;
    this.filtros.numero = null;
    this.filtros.chassi = null;
    this.filtros.placa = null;
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.grupo_economico
      || this.filtros.numero
      || this.filtros.chassi
      || this.filtros.placa
      || this.filtros.data_inicial
      || this.filtros.data_final;
  }

  selecionarMarcas() {
    $('#modal-marcas').modal();
  }

  removerMarca(marca: any) {
    marca.selecionado = false;
  }

  onAdicionarMarcaFiltro(marca: any) {
    marca.selecionado = true;
  }

  selecionarTipoOs() {
    $('#modal-tipo-os').modal();
  }

  removerTipoOs(tipo: any) {
    tipo.selecionado = false;
  }

  onAdicionarTipoOsFiltro(tipo: any) {
    tipo.selecionado = true;
  }

  selecionarDealer() {
    $('#modal-dealers').modal();
  }

  removerDealer(dealer: any) {
    dealer.selecionado = false;
  }

  onAdicionarDealerFiltro(dealer: any) {
    dealer.selecionado = true;
  }

  filtrar() {
    return this.selecionados;
  }

  exibirOs(id: number) {
    this.idOs = id;
  }

  voltar() {
    this.idOs = null;
  }

  pesquisar() {
    this.selecionados = [];
    const sel = [];

    this.incluirFiltroDealers(sel);
    this.incluirFiltroMarcas(sel);
    this.incluirFiltroTiposOs(sel);
    this.carregarFiltrosEspecificos(sel);

    this.selecionados = sel;
  }

  carregarFiltrosEspecificos(filtros: any[]) {
    for (const chave in this.filtros) {
      if (this.filtros.hasOwnProperty(chave) && this.filtros[chave]) {
        const item = {'chave': chave, 'valor': this.filtros[chave]};
        filtros.push(item);
      }
    }
  }

  private incluirFiltroDealers(filtros: any[]) {
    if (this.filtroDealers.selecionados().length > 0) {
      const item = { 'chave': 'dealers', 'valor': [] };
      this.filtroDealers.selecionados().forEach(element => {
        item.valor.push(element.id);
      });
      filtros.push(item);
    }
  }

  private incluirFiltroMarcas(filtros: any[]) {
    if (this.filtroMarcas.selecionados().length > 0) {
      const item = { 'chave': 'marcas', 'valor': [] };
      this.filtroMarcas.selecionados().forEach(element => {
        item.valor.push(element.id);
      });
      filtros.push(item);
    }
  }

  private incluirFiltroTiposOs(filtros: any[]) {
    if (this.filtroTipoOs.selecionados().length > 0) {
      const item = { 'chave': 'tipos', 'valor': [] };
      this.filtroTipoOs.selecionados().forEach(element => {
        item.valor.push(element.id);
      });
      filtros.push(item);
    }
  }

  selecionar(selecionado: RetornoSelecao) {
    this.selecionado = selecionado.registro;
  }

  definirFiltro() {
    $('#rmpv-detalhado-filtro').modal();
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
