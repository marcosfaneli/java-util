import { Filtros } from '../../comum/crud/Filtro/Filtros';
import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { RmpvPassagemService } from '../rmpv-passagem-service/rmpv-passagem.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Parametro } from '../../comum/service-base/parametro';
import { TotalizadorResumo } from './totalizador-resumo';
import { IColunaGrid } from '../../comum/gridview/estrutura/IColunaGrid';

@Component({
  selector: 'app-rmpv-passagem-lista',
  templateUrl: './rmpv-passagem-lista.component.html',
  styleUrls: ['./rmpv-passagem-lista.component.css'],
})

export class RmpvPassagemListaComponent extends ListaBase implements OnInit {

  visualizarTotalRegistros: boolean;

  dadosHorizontal: any[] = [];
  estruturaHorizontal: IColunaGrid[] = [];
  totalHorizontal: any[] = [];

  dadosResumo: TotalizadorResumo[] = [];

  total: TotalizadorResumo;
  totalInternas: TotalizadorResumo;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  public barChartColors: any[] = [];
  public exibirBotaoDetalhes: boolean;

  detalhe = {
    descricao: 'Ver detalhado por mês',
    icone: 'fa fa-calendar',
    acao: function() {
      this.router.navigateByUrl(this.obterUrlComFiltros());
    }.bind(this)
  }

  obterUrlComFiltros(): string {
    let url = '';
    for (const filtro in this.filtros) {
      if (this.filtros.hasOwnProperty(filtro)) {
        url += url ? '&' + filtro + '=' + this.filtros[filtro] : '?' + filtro + '=' + this.filtros[filtro];
      }
    }
    return 'rmpv/passagem/mensal' + url;
  }

  constructor(service: RmpvPassagemService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);

    this.exibirBotaoNovo = false;
    this.listagemComPaginacao = false;
    this.quantidadeRegistrosPagina = 5;
    this.visualizarTotalRegistros = false;
    this.visualizarTotalInterna = true; // Habilita visualizar a somatória de valores RMPV interna
    this.visualizarTotalGeral = true;  // Habilita visualizar a somatória de valores RMPV geral
    this.exibirBotaoDetalhes = true;
    this.exibirBotaoDetalhesIcon = true;
    this.nomeModulo = 'passagem';
  }

  ngOnInit() {
    this.buscar();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.mercado
      || this.filtros.grupo_economico
      || this.filtros.regiao
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
    this.total = new TotalizadorResumo();
    this.totalInternas = new TotalizadorResumo();
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
      });
  }

  carregarMarcas(lista: any[]): any {
    this.limpar();

    lista.forEach(element => {
      if (element.id === 31) {
        this.totalizarlandRover(element.dados);
      } else if(element.id === 40) {
        this.totalizarJaguar(element.dados);
      }
    });

    // this.carregarTotalizadorHorizontal(lista);

    // this.carregarGraficos(lista);

    this.carregarEstruturaResumo();

    return this.dadosResumo;
  }

  // carregarGraficos(lista: any[]) {
  //   const grafico = new TotalizadorGrafico();

  //   grafico.processar(lista);

  //   this.barChartLabels = grafico.getLabels();
  //   this.barChartType = grafico.getTipo();
  //   this.barChartLegend = grafico.getLegenda();
  //   this.barChartData = grafico.getDados();
  //   this.barChartColors = grafico.getColors();
  // }

  // carregarTotalizadorHorizontal(lista: any[]): any {
  //   const horizontal = new TotalizadorHorizontal();

  //   horizontal.processar(lista);

  //   this.dadosHorizontal = horizontal.dados();
  //   this.estruturaHorizontal = horizontal.grid();
  //   this.totalHorizontal = horizontal.total();
  // }

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

  totalizarJaguar(lista: any[]) {
    lista.forEach(element => {
      const categoria: TotalizadorResumo = this.encontrarCategoriaResumo(element);

      categoria.valorJaguar += element.total;

      this.total.valorJaguar += categoria.valorJaguar;
      this.totalInternas.valorJaguar += element.interna ? element.total : 0;
    });
  }

  totalizarlandRover(lista: any[]) {
    lista.forEach(element => {
      const categoria: TotalizadorResumo = this.encontrarCategoriaResumo(element);

      categoria.valorLandRover += element.total;

      this.total.valorLandRover += categoria.valorLandRover;
      this.totalInternas.valorLandRover += element.interna ? element.total : 0;
    });
  }

  private carregarEstruturaResumo() {
    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaW('categoria', 'Categorias', '200px')
      .addColuna('valorLandRover', 'Land Rover')
      .addColuna('valorJaguar', 'Jaguar')
      .addColuna('total', 'Total JLR')
      .build();

    this.estruturaInterna = new EstruturaGridViewBuilder()
      .addColunaW('', 'Interna (Retorno + Usados)', '200px')
      .addColuna('', this.totalInternas.valorLandRover.toLocaleString('pt-br'))
      .addColuna('', this.totalInternas.valorJaguar.toLocaleString('pt-br'))
      .addColuna('', this.totalInternas.total.toLocaleString('pt-br'))
      .build();

    this.estruturaTotal = new EstruturaGridViewBuilder()
      .addColunaW('', 'Total', '200px')
      .addColuna('', this.total.valorLandRover.toLocaleString('pt-br'))
      .addColuna('', this.total.valorJaguar.toLocaleString('pt-br'))
      .addColuna('', this.total.total.toLocaleString('pt-br'))
      .build();
    }

   
}
