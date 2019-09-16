import { RmpvMensalComponent } from './../../rmpv-mensal/rmpv-mensal.component';
import { Filtros } from './../../comum/crud/Filtro/Filtros';
import { Component, OnInit, Output } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { RmpvServicoService } from '../rmpv-servico-service/rmpv-servico.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Parametro } from '../../comum/service-base/parametro';
import { TotalizadorResumo } from './totalizador-resumo';
import { TotalizadorDetalhes } from './totalizador-detalhes';
import { IColunaGrid } from '../../comum/gridview/estrutura/IColunaGrid'; 

@Component({
  selector: 'app-rmpv-servico-lista',
  templateUrl: './rmpv-servico-lista.component.html',
  styleUrls: ['./rmpv-servico-lista.component.css'],
})

export class RmpvServicoListaComponent extends ListaBase implements OnInit {

 
  visualizarTotalRegistros: boolean;

  dadosResumo: TotalizadorResumo[] = [];
  dadosJaguar: TotalizadorDetalhes[] = [];
  dadosLandRover: TotalizadorDetalhes[] = [];
  dadosJlr: TotalizadorDetalhes[] = [];

  estruturaDetalhe: IColunaGrid[] = [];
  estruturaDetalheTotal: IColunaGrid[] = [];

  total: TotalizadorResumo;
  totalInternas: TotalizadorResumo;
  totalLandRover: TotalizadorDetalhes;
  totalJaguar: TotalizadorDetalhes;
  totalJlr: TotalizadorDetalhes;
  totalizador: TotalizadorDetalhes;

  habilitaDetalheLandRover = false;
  habilitaDetalheJaguar = false;
  habilitaDetalheJlr = false;

  public exibirBotaoDetalhes: boolean;
  
  detalhe = {
    descricao: 'Ver detalhado por mês',
    icone: 'fa fa-calendar',
    acao: function() {
      this.router.navigateByUrl(this.obterUrlComFiltros(), {state: {modulo: 'oficina'}});      
    }.bind(this)
  }
  
  constructor(service: RmpvServicoService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.exibirBotaoNovo = false;
    this.listagemComPaginacao = false;
    this.quantidadeRegistrosPagina = 5;
    this.visualizarTotalRegistros = false;
    this.visualizarTotalInterna = true; // Habilita visualizar a somatória de valores RMPV interna
    this.visualizarTotalGeral = true;  // Habilita visualizar a somatória de valores RMPV geral
    this.exibirBotaoDetalhes = false;
    this.exibirBotaoDetalhesIcon = true;
    this.nomeModulo = 'oficina';   // Nome dado ao arquivo excel gerado e ao serviço da api rmpv mensal
  }

   ngOnInit() {
    this.buscar(); 
  }

  obterUrlComFiltros(): string {
    let url = '';
    for (const filtro in this.filtros) {
      if (this.filtros.hasOwnProperty(filtro)) {
        url += url ? '&' + filtro + '=' + this.filtros[filtro] : '?' + filtro + '=' + this.filtros[filtro];
      }
    }
    return 'rmpv/mensal' + url;
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.mercado
      || this.filtros.grupo_economico
      || this.filtros.regional
      || this.filtros.dealer
      || this.filtros.data_inicial
      || this.filtros.data_final;
  }

  getDados(response: any): any {
    return this.carregarMarcas(response['marcas']);
  }

  limpar() {
    this.dadosResumo = [];
    this.dadosJaguar = [];
    this.dadosLandRover = [];
    this.dadosJlr = [];
    this.total = new TotalizadorResumo();
    this.totalInternas = new TotalizadorResumo();
    this.totalLandRover = new TotalizadorDetalhes(0, 'Total');
    this.totalJaguar = new TotalizadorDetalhes(0, 'Total');
    this.totalJlr = new TotalizadorDetalhes(0, 'Total');
  }

  carregar() {
    const objFiltro = new Filtros();

    for (const chave in this.filtros) {
      if (this.filtros.hasOwnProperty(chave) && this.filtros[chave]) {
        objFiltro.filtros.push(new Parametro(chave, this.filtros[chave]));
      }
    }

    this.service.listar([], objFiltro)
      .then(itens => {
        this.carregarMarcas(itens['marcas']);
      })
      .catch(error => {
        this.tratarErro('Erro consultando dados', 'Erro', error)
      });
  }

  carregarMarcas(lista: any[]): any {
    this.limpar();

    lista.forEach(element => {
      if (element.id === 31) {
        this.totalizarJlr(element.dados);
        this.totalizarlandRover(element.dados);
      } else if (element.id === 40) {
        this.totalizarJlr(element.dados);
        this.totalizarJaguar(element.dados);
      }
    });

    this.carregarEstruturaResumo();

 //   this.carregarEstruturaDetalhe();

    return this.dadosResumo;
  }

   carregarEstruturaDetalheLandRouver() {
     this.estruturaDetalhe = this.carregarGridDetalhes();
     this.estruturaDetalheTotal = this.carregarTotalGridDetalhes( this.totalLandRover);
   }

   carregarEstruturaDetalheJaguar() {
    this.estruturaDetalhe = this.carregarGridDetalhes();
    this.estruturaDetalheTotal = this.carregarTotalGridDetalhes( this.totalJaguar);
   }

  carregarEstruturaDetalheJLR() {
    this.estruturaDetalhe = this.carregarGridDetalhes();
    this.estruturaDetalheTotal = this.carregarTotalGridDetalhes( this.totalJlr);
   }

  private encontrarCategoriaResumo(element: any) {
    const index = this.dadosResumo.findIndex((item) => element.id === item.id);

    let categoria: TotalizadorResumo;

    if (index === -1) {
      categoria = new TotalizadorResumo();
      categoria.id = element.id;
      categoria.categoria = element.nome;
      this.dadosResumo.push(categoria);
    } else {
      categoria = this.dadosResumo[index];
    }

    return categoria;
  }

  private totalizarDetalhe(element: any, dados: TotalizadorDetalhes[], totalizador: TotalizadorDetalhes) {
    const index = dados.findIndex((item) => element.id === item.id);

    let categoria: TotalizadorDetalhes;

    if (index === -1) {
      categoria = new TotalizadorDetalhes(element.id, element.nome);
      dados.push(categoria);
    } else {
      categoria = dados[index];
    }

    this.adicionarValoresDetalhes(categoria, element);
    this.adicionarValoresDetalhes(totalizador, element);

    return categoria;
  }

  private adicionarValoresDetalhes(categoria: TotalizadorDetalhes, element: any) {
    categoria.faturamento += element.faturamento;
    categoria.horasTrabalhadas += element.horasTrabalhadas;
    categoria.horasVendidas += element.horasVendidas;
    categoria.maoDeObra += element.valorMaoObraUnitario;
  }

  /*********     Totalizador  Jaguar   ********/
  totalizarJaguar(lista: any[]) {
    lista.forEach(element => {
      this.totalizarDetalhe(element, this.dadosJaguar, this.totalJaguar);

      const categoria: TotalizadorResumo = this.encontrarCategoriaResumo(element);

      categoria.valorJaguar += element.faturamento;

      this.total.valorJaguar += categoria.valorJaguar;
      this.totalInternas.valorJaguar += element.interna ? element.faturamento : 0;

      this.estruturaDetalheTotal = this.carregarTotalGridDetalhes( this.totalJaguar);
    });
  }

  /*********     Totalizador  LandRover   ********/
  totalizarlandRover(lista: any[]) {
    lista.forEach(element => {
      this.totalizarDetalhe(element, this.dadosLandRover, this.totalLandRover);


      const categoria: TotalizadorResumo = this.encontrarCategoriaResumo(element);

      categoria.valorLandRover += element.faturamento;

      this.total.valorLandRover += categoria.valorLandRover;
      this.totalInternas.valorLandRover += element.interna ? element.faturamento : 0;

      this.estruturaDetalheTotal = this.carregarTotalGridDetalhes( this.totalLandRover);
    });
  }

  /*********     Totalizador  JLR   ********/
  totalizarJlr(lista: any[]) {
    lista.forEach(element => {
      this.totalizarDetalhe(element, this.dadosJlr, this.totalJlr);
    });
  }

  public exibirDetalhesLandRover(ctx: RmpvServicoListaComponent) {
    this.carregarEstruturaDetalheLandRouver();
    ctx.habilitaDetalheJaguar = false;
    ctx.habilitaDetalheJlr = false;
    ctx.habilitaDetalheLandRover = true;
  }

  public exibirDetalhesJaguar(ctx: RmpvServicoListaComponent) {
    this.carregarEstruturaDetalheJaguar();
    ctx.habilitaDetalheLandRover = false;
    ctx.habilitaDetalheJlr = false;
    ctx.habilitaDetalheJaguar = true;
  }

  public exibirDetalhesJlr(ctx: RmpvServicoListaComponent) {
    this.carregarEstruturaDetalheJLR()
    ctx.habilitaDetalheJaguar = false;
    ctx.habilitaDetalheLandRover = false;
    ctx.habilitaDetalheJlr = true;
  }

  private carregarEstruturaResumo() {
    const ctx = this;

    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaW('categoria', 'Serviços', '200px')
      .addColunaNumericaFormatadaWAction('valorLandRover', 'Land Rover', '', function() {ctx.exibirDetalhesLandRover(ctx); })
      .addColunaNumericaFormatadaWAction('valorJaguar', 'Jaguar', '',  function() {ctx.exibirDetalhesJaguar(ctx); })
      .addColunaNumericaFormatadaWAction('total', 'Total JLR', '',  function() {ctx.exibirDetalhesJlr(ctx); })
      .build();

    this.estruturaInterna = new EstruturaGridViewBuilder()
      .addColunaW('', 'Interna (Retorno + Usados)', '200px')
      .addColunaNumericaFormatada('', this.totalInternas.valorLandRover.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .addColunaNumericaFormatada('', this.totalInternas.valorJaguar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .addColunaNumericaFormatada('', this.totalInternas.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .build();

    this.estruturaTotal = new EstruturaGridViewBuilder()
      .addColunaW('', 'Total', '200px')
      .addColunaNumericaFormatada('', this.total.valorLandRover.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .addColunaNumericaFormatada('', this.total.valorJaguar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .addColunaNumericaFormatada('', this.total.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
      .build();

      this.carregarGridDetalhes();
  }

  private carregarGridDetalhes(): IColunaGrid[] {
    return new EstruturaGridViewBuilder()
      .addColunaW('nome', 'Categorias', '100px')
 //     .addColunaNumericaFormatada('faturamento', 'Faturamento')
      .addColunaNumericaFormatada('maoDeObra', 'Valor Mão de Obra')
      .addColunaNumerica('horasVendidas', 'Horas Vendidas')
      .addColunaNumerica('horasTrabalhadas', 'Horas Trabalhadas')
      .build();
  }

  private carregarTotalGridDetalhes(totalizador: TotalizadorDetalhes): IColunaGrid[] {

    return new EstruturaGridViewBuilder()
    .addColunaW('', 'Total', '100px')
 //   .addColunaNumerica('', totalizador.faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    .addColunaNumerica('', totalizador.maoDeObra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    .addColunaNumerica('', totalizador.horasVendidas.toFixed(2))
    .addColunaNumerica('', totalizador.horasTrabalhadas.toFixed(2))
    .build();

  }

  private ocultarLandRover() {
    this.habilitaDetalheLandRover = false;
  }

  private ocultarJaguar() {
    this.habilitaDetalheJaguar = false;
  }

  private ocultarJlr() {
    this.habilitaDetalheJlr = false;
  }
}
