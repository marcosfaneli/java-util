import { RetornoSelecao } from '../gridview/RetornoSelecao';
import { ServiceCRUD } from './ServiceCRUD';
import { IColunaGrid } from '../gridview/estrutura/IColunaGrid';
import { Output, EventEmitter, Input } from '@angular/core';
import { Filtros } from './Filtro/Filtros';
import { FiltrosComPaginacao } from './Filtro/FiltrosComPaginacao';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from '../service-base/parametro';
import { ParametroMultivalor } from '../service-base/parametroMultivalor';
import { Router } from '@angular/router';

export abstract class ListaBase {

  @Output() definirFiltro: EventEmitter<any> = new EventEmitter<any>();
  @Output() exibir: EventEmitter<RetornoSelecao> = new EventEmitter<RetornoSelecao>();
  @Input() filtros: any;

  visualizarTotalInterna = false; // Habilita visualizar a somatória de valores RMPV interna
  visualizarTotalGeral = false;  // Habilita visualizar a somatória de valores RMPV geral

  exibirBotaoDefinirFiltros = true;
  exibirBarraCor = true;
  exibirBotaoAjuda = true;
  exibirBotaoNovo = true;
  exibirBotaoDetalhesIcon = false;
  nomeModulo: string;
  total_registros = 0;
  listagemComFiltros = false;
  carregando = true;
  dados: any = [];
  marcas: any = [];
  produtivos: any = [];
  // ------------- Estrutura RMPV Serviços/ Peças -----------
  estrutura: IColunaGrid[] = [];
  estruturaInterna: IColunaGrid[] = [];
  estruturaTotal: IColunaGrid[] = [];
  estruturaImpressao: any[] = [];

  listagemComPaginacao = false;
  paginaAtual = 1;
  quantidadeRegistrosPagina: number;
 
  constructor(
    protected service: ServiceCRUD,
    protected toastr: ToastrService,
    protected router: Router
  ) {
    this.service = service;
    this.toastr = toastr;
    this.carregando = false;
  }

  protected abstract getListagemComFiltros(): boolean;
  
  atualizar() {
    this.buscar();
    const retorno: RetornoSelecao = new RetornoSelecao();
    retorno.novoCadastro = false;
    retorno.registro = undefined;
    this.exibir.emit(retorno);
  }

  buscar() {
    this.paginaAtual = 1;
    this.buscarDados();
  }

  buscarDados() {
    this.carregando = true;
    let objFiltro: Filtros;

    if (this.listagemComPaginacao) {
      objFiltro = new FiltrosComPaginacao();
      (<FiltrosComPaginacao>objFiltro).paginacao.quantidade_registros_por_pagina = this.quantidadeRegistrosPagina;
      (<FiltrosComPaginacao>objFiltro).paginacao.pagina_atual = this.paginaAtual;
    } else {
      objFiltro = new Filtros();
    }

    for (const chave in this.filtros) {
      if (this.filtros.hasOwnProperty(chave) && this.filtros[chave]) {
        this.incluirItemFiltro(chave, objFiltro);
      }
    }

    this.service.buscar(objFiltro)
      .then(registros => {
        this.dados = this.getDados(registros);
        this.total_registros = registros.total_registros;
        this.listagemComFiltros = this.getListagemComFiltros();
        this.carregando = false;
      })
      .catch(error => this.tratarErro('Não foi possível retornar dados.', 'Erro', <any>error));
  }

  private incluirItemFiltro(chave: any, objFiltro: Filtros) {
    if (Array.isArray(this.filtros[chave])) {
      objFiltro.filtros.push(new ParametroMultivalor(chave, this.filtros[chave]));
    } else {
      objFiltro.filtros.push(new Parametro(chave, this.filtros[chave]));
    }
  }

  novo() {
    const retorno: RetornoSelecao = new RetornoSelecao();
    retorno.novoCadastro = true;
    retorno.registro = {};
    this.exibir.emit(retorno);
  }

  ver(registro: RetornoSelecao) {
    this.carregarModel(registro)
      .then(res => {
        registro = res;
        this.exibir.emit(registro);
      })
      .catch(error => this.tratarErro('Não foi possível carregar o registro.', 'Erro', <any>error));
  }

  protected carregarModel(registro: any): Promise<any> {
    return Promise.resolve(registro);
  }

  mudarQuantidadePorPagina(quantidadePorPagina: number) {
    this.quantidadeRegistrosPagina = quantidadePorPagina;
  }

  mudarPaginaAtual(pagina: number) {
    this.paginaAtual = pagina;
    this.buscarDados();
  }

  definirFiltragem() {
    this.definirFiltro.emit();
  }

  tratarErro(mensagem: string, titulo: string, error: any) {
    this.carregando = false;

    console.error(error);

    let texto: string;
    try {
      texto = error.json().erro ? mensagem + '\n' + error.json().erro : mensagem;
    } catch (Exception) {
      texto = mensagem;
    }

    this.toastr.error(texto, titulo, <any>error);

    if (error.status === 401) {
      this.router.navigateByUrl('logout');
    }
  }

  protected getDados(response: any): any {
  return response.dados;
  }

}
