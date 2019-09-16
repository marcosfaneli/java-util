import { Observable } from 'rxjs/Observable';
import { Estado } from '../comum/shared/estado.enum';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RmpvMensalService } from './service/rmpv-mensal.service';
import { ListaBase } from '../comum/crud/ListaBase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormatarData } from '../comum/formatarData';
import { TotalizadorGrafico } from './totalizador-grafico';

import { FiltroService } from '../comum/filtro/filtro.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-rmpv-mensal',
  templateUrl: './rmpv-mensal.component.html',
  styleUrls: ['./rmpv-mensal.component.css']
})
export class RmpvMensalComponent extends ListaBase implements OnInit {
  carregando = false;
  categorias: string[] = [];
  totalGeral: any;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{display:false},
   };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData: any[] = [];
  public barChartColors: any[] = [];

  @Input() modulo: any = 'oficina';
  state$: Observable<object>;

  grafico;
  parametrosFiltro: any;
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query
  PrimeiraMarcaLabel = true;
  SegundaMarcaLabel  = false;
  PrimeiraMarca: boolean = true;
  SegundaMarca: boolean  = true;
 
  constructor(service: RmpvMensalService, private toast: ToastrService, router: Router, private route: ActivatedRoute) {
    super(service, toast, router);
    (this.service as RmpvMensalService).setNomeServico(this.modulo);
    this.route.queryParams.subscribe(params => {
      this.parametrosFiltro = params;
      this.setaValorData(params['data_inicial'], params['data_final']);
      this.carregarFiltrosParametros();
    });
  }
  
  ngOnInit() {
     this.buscar();
     this.state$ = this.route.paramMap
      .pipe(map(() => window.history.state))
  }

  carregarFiltrosParametros() {
    if (this.parametrosFiltro) {
      for (const item in this.parametrosFiltro) {
        if (this.parametrosFiltro.hasOwnProperty(item)) {

          this.filtros[item] = this.parametrosFiltro[item];
 //                  console.log(this.filtros);
        }
      }
    }
  }

  setaValorData(dataInicial: Date, dataFinal: Date) {
    if (dataInicial === undefined || dataInicial.toString() === '') {
      const dt = new Date();
      const dataInicial = { 'year': dt.getFullYear(), 'month': dt.getMonth() + 1, 'day': 1 };
      const dataInicialFormata = new FormatarData(dataInicial.year, dataInicial.month, dataInicial.day, 0, 0, 0).getDataString();
      this.InicialData = dataInicialFormata;
    } else {
      const now = new Date(dataInicial);
      this.InicialData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }

    if (dataFinal === undefined || dataFinal.toString() === '') {
      const FinalData = new Date();
      this.FinalData = { 'year': FinalData.getFullYear(), 'month': FinalData.getMonth() + 1, 'day': FinalData.getDate() };
    } else {
      const now = new Date(dataFinal);
      this.FinalData = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + (now.getUTCDate())).slice(-2);
    }
    this.filtros = { data_inicial: this.InicialData, data_final: this.FinalData };
  }
// console.log(this.InicialData);

  protected getDados(res: any): any {
    if (res.meses.length === 0) {
     return res.meses;
    }

    this.totalGeral = {};
    this.totalGeral.marcas = [];

    this.carregarTipos(res.meses[0].marcas[0]);

    this.calcularTotaisMensais(res);

    this.calcularTotalGeral();

    this.carregando = false;
    return res.meses;
  }

  private calcularTotalGeral() {
    const total = this.criarTotalizador(this.totalGeral.marcas[0], 'Total', 0);
        this.totalGeral.marcas.forEach(marca => {
      this.totalizarCategorias(marca);
      this.totalizarMarcas(marca, total);
    });
    this.totalGeral.marcas.push(total);
    this.totalizarCategorias(total);

    this.carregarGraficos(this.totalGeral.marcas);
  }

  private calcularTotaisMensais(res: any) {
    res.meses.forEach(mes => {
      const totalMes = this.criarTotalizador(res.meses[0].marcas[0], 'Total', 0);
      this.totalizarPorMes(mes, totalMes);
    });
  }

  private totalizarPorMes(mes: any, totalMes: any) {
    mes.marcas.forEach(marca => {
      this.somarTotalGeralPorMarca(marca);
      this.totalizarCategorias(marca);
      this.totalizarMarcas(marca, totalMes);
    });

    this.totalizarCategorias(totalMes);
    mes.marcas.push(totalMes);
  }

  carregarGraficos(lista: any[]) {
    this.grafico = new TotalizadorGrafico();
    this.grafico.processar(lista);

    this.barChartLabels = this.grafico.getLabels();
    this.barChartType   = this.grafico.getTipo();
    this.barChartLegend = this.grafico.getLegenda();
    this.barChartColors = this.grafico.getColors();
    this.barChartData   = this.grafico.getDados();
    this.PrimeiraMarcaLabel = this.barChartData[0].label;
    this.SegundaMarcaLabel  = this.barChartData[1].label;
  }

  chartMarcaSelected() {
    let grafico = new TotalizadorGrafico();
    grafico.processar(this.totalGeral.marcas);
    this.barChartLabels = grafico.getLabels();
    this.barChartType   = grafico.getTipo();
    this.barChartLegend = grafico.getLegenda();
    this.barChartColors = grafico.getColors();
  
  if (this.PrimeiraMarca === true){ 
      if (this.SegundaMarca === true) {
          this.barChartData = grafico.getDados();
      } else {
        this.barChartData = grafico.getDadosJaguar(); 
      }
  } 
  else if (this.PrimeiraMarca === false){
    if (this.SegundaMarca === true){ 
       this.barChartData = grafico.getDadosLandRover();
      } 
    else {
        this.barChartData = grafico.getDadosVazio();
    }
  } 
  
  }

  totalizarMarcas(marca: any, total: any) {
    marca.dados.forEach(element => {
      const index = total.dados.findIndex((item) => element.id === item.id);
      total.dados[index].faturamento += element.faturamento;
    });
  }

  criarTotalizador(objeto: any, descricao: string, id: number): any {

    const total: any = {};
    total.dados = [];

    objeto.dados.forEach(element => {
      const categoria: any = {};
      for (const chave in element) {
        if (element.hasOwnProperty(chave)) {
          categoria[chave] = element[chave];
        }
      }
      categoria.faturamento = 0;
      total.dados.push(categoria);
    });

    total.id = id;
    total.marca = descricao;

    return total;
  }

  somarTotalGeralPorMarca(marca: any) {

    let item: any;

    const index = this.totalGeral.marcas.findIndex((p) => marca.id === p.id);

    if (index < 0) {
      item = this.criarTotalizador(marca, marca.marca, marca.id);
      this.totalGeral.marcas.push(item);
    } else {
      item = this.totalGeral.marcas[index];
    }

    item.dados.forEach(element => {
      const posicao = marca.dados.findIndex((c) => c.id === element.id);
      const fat = marca.dados[posicao].faturamento;
      element.faturamento += fat;
    });
  }

  carregarTipos(marca: any): any {
    this.categorias = [];
    marca.dados.forEach(element => {
      this.categorias.push(element.nome);
    });
  }

  totalizarCategorias(marca: any) {
    let total = 0;
    let internas = 0;

    marca.dados.forEach(categoria => {
      total += categoria.faturamento;
      internas += categoria.interna ? categoria.faturamento : 0;
    });

  marca.total = total;
  marca.internas = internas;
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

  public definirFiltragem() {
    $('#rmpv-servico-mensal-filtro').modal();
  }

   voltar() {
    this.router.navigateByUrl(this.obterUrlComFiltros());
  //   this.router.navigateByUrl("rmpv/oficina");
   }

  obterUrlComFiltros(): string {
    let url = '';
    for (const filtro in this.filtros) {
      if (this.filtros.hasOwnProperty(filtro)) {
        url += url ? '&' + filtro + '=' + this.filtros[filtro] : '?' + filtro + '=' + this.filtros[filtro];
      }
    }
    return 'rmpv/oficina' + url;
  }

}
