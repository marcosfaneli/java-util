import { Component, OnInit } from '@angular/core';
import { RmpvPecaMensalService } from './service/rmpv-peca-mensal.service';
import { ListaBase } from '../comum/crud/ListaBase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormatarData } from '../comum/formatarData';
import { TotalizadorGrafico } from './totalizador-grafico';

import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-rmpv-peca-mensal',
  templateUrl: './rmpv-peca-mensal.component.html',
  styleUrls: ['./rmpv-peca-mensal.component.css']
})
export class RmpvPecaMensalComponent extends ListaBase implements OnInit {

  carregando = false;
  categorias: string[] = [];
  totalGeral: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  public barChartColors: any[] = [];

  parametrosFiltro: any;
  InicialData; // Set the first Day of month
  FinalData; // set the last day of query

  constructor(service: RmpvPecaMensalService, toast: ToastrService, router: Router, private route: ActivatedRoute) {
    super(service, toast, router);
    this.route.queryParams.subscribe(params => {
      this.parametrosFiltro = params;
      this.setaValorData(params['data_inicial'], params['data_final']);
      this.carregarFiltrosParametros();
    });

  }

  ngOnInit() {
    this.buscar();
  }

  setaValorData(dataInicial: Date, dataFinal: Date) {
    if (dataInicial === undefined || dataInicial.toString() === '') {
      const firstData = new Date();
      this.InicialData = firstData.getFullYear() + '-' + ('0' + (firstData.getMonth() + 1)).slice(-2) + '-' + '01';
    } else {
      const now = new Date(dataInicial);
      this.InicialData = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + (now.getUTCDate())).slice(-2);
    }

    if (dataFinal === undefined || dataFinal.toString() === '') {
      const lastData = new Date();
      this.FinalData = lastData.getFullYear() + '-' + ('0' + (lastData.getMonth() + 1)).slice(-2) + '-' + lastData.getUTCDate();
    } else {
      const now = new Date(dataFinal);
      this.FinalData = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + (now.getUTCDate())).slice(-2);
    }

    this.filtros = { data_inicial: this.InicialData, data_final: this.FinalData };
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
      mes.marcas.forEach(marca => {
        marca.dados.forEach(element => {
          element['faturamento'] = element.original + element.paralelo + element.lubrificante + element.pneu;
        });
      });

      const totalMes = this.criarTotalizador(res.meses[0].marcas[0], 'Total', 0);
      this.totalizarPorMes(mes, totalMes);
    });
  }

  private totalizarPorMes(mes: any, totalMes: any) {
    mes.marcas.forEach(marca => {
      this.totalizarCategorias(marca);
      this.somarTotalGeralPorMarca(marca);
      this.totalizarMarcas(marca, totalMes);
    });

    this.totalizarCategorias(totalMes);
    mes.marcas.push(totalMes);
  }

  carregarGraficos(lista: any[]) {
    const grafico = new TotalizadorGrafico();

    grafico.processar(lista);

    this.barChartLabels = grafico.getLabels();
    this.barChartType = grafico.getTipo();
    this.barChartLegend = grafico.getLegenda();
    this.barChartData = grafico.getDados();
    this.barChartColors = grafico.getColors();
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

      // const fat = marca.dados[posicao].original
      //   + marca.dados[posicao].paralelo
      //   + marca.dados[posicao].lubrificante
      //   + marca.dados[posicao].pneu;

      element.faturamento += marca.dados[posicao].faturamento;
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
      // categoria.faturamento = 1; // categoria.original + categoria.paralelo + categoria.lubrificante + categoria.pneu;
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
    $('#rmpv-peca-mensal-filtro').modal();
  }

}
