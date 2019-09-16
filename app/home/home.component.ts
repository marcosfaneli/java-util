import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DashBoard } from '../comum/dashboard';
import { HomeService } from './home-service/home.service';
import { FormatarData } from '../comum/formatarData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  carregando: boolean;
  resolucaoTelaGrafico = screen.availWidth; // recebe o valor do tamanho da tela, assim ira apresentar no grafico de O.S. por dia.
  filtroMarcas = [];
  index: number[] = [];
  valor: number[] = [];
  quantidade: number[] = [];
  quant: number[] = [];
  dados: any = {};
  public innerWidth: any;

  configShowNumber = {
    animation: 'count',
    format: '(.ddd),dd'
  };

  @ViewChild('chartValores') chartValores: BaseChartDirective;
  public chartValoresOptions: any = {responsive: true, legend: {position: 'left'}}; // maintainAspectRatio: false,
  public chartValoresLabels: string[] = ['Peças (0%)', 'Mão de Obra (0%)', 'Acessórios (0%)'];
  public chartValoresData: any[] = [{ data: [0, 0, 0], backgroundColor: ['#006442', '#16A085', '#87D37C']}];
  public chartValoresType = 'pie';
  public chartValoresLegend = true;

  @ViewChild('chartQuantidadeAberturaOS') chartQuantidadeAberturaOS: BaseChartDirective;
  public chartQuantidadeAberturaOSOptions: any = {responsive: true, scaleShowVerticalLines: false,  tickMarkLength: 2000, stacked: true,
    legend: {position: 'top'}};
  public chartQuantidadeAberturaOSLabels: string[] = [];
  public chartQuantidadeAberturaOSType = 'line';
  public chartQuantidadeAberturaOSLegend = true;
  public chartQuantidadeAberturaOSData: any[] = [{data: [], label: 'Mês Anterior'}, {data: [], label: 'Mês Atual'}];

  @ViewChild('chartValorAberturaOS') chartValorAberturaOS: BaseChartDirective;
  public chartValorAberturaOSOptions: any = {responsive: true, scaleShowVerticalLines: true, legend: {position: 'top'}};
  public chartValorAberturaOSLabels: string[] = [];
  public chartValorAberturaOSType = 'line';
  public chartValorAberturaOSLegend = true;
  public chartValorAberturaOSData: any[] = [{data: [], label: 'Mês Anterior'}, {data: [], label: 'Mês Atual'}];

  @ViewChild('chartQuantidadeFechamentoOS') chartQuantidadeFechamentoOS: BaseChartDirective;
  public chartQuantidadeFechamentoOSOptions: any = {responsive: true, scaleShowVerticalLines: true, legend: {position: 'top'}};
  public chartQuantidadeFechamentoOSLabels: string[] = [];
  public chartQuantidadeFechamentoOSType = 'line';
  public chartQuantidadeFechamentoOSLegend = true;
  public chartQuantidadeFechamentoOSData: any[] = [{data: [], label: 'Mês Anterior'}, {data: [], label: 'Mês Atual'}];

  @ViewChild('chartValorFechamentoOS') chartValorFechamentoOS: BaseChartDirective;
  public chartValorFechamentoOSOptions: any = {responsive: true, scaleShowVerticalLines: true, legend: {position: 'top'}};
  public chartValorFechamentoOSLabels: string[] = [];
  public chartValorFechamentoOSType = 'line';
  public chartValorFechamentoOSLegend = true;
  public chartValorFechamentoOSData: any[] = [{data: [], label: 'Mês Anterior'}, {data: [], label: 'Mês Atual'}];

  constructor(private servico: HomeService, private dash: DashBoard, private toastr: ToastrService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resolucaoTelaGrafico = event.target.innerWidth;
  }

  ngOnInit() {
    this.carregando = true;
    this.atualizarFiltroMarcas();
  }

  atualizarFiltroMarcas() {
    this.carregando = true;
    let promise: Promise<any>;

    promise = this.servico.getFiltroMarcas()

    promise
    .then(r => {
      this.preencherFiltroMarcas(r.dados);

      const m = [];

      this.filtroMarcas.forEach(element => {
        if (element.selecionado) {
          m.push(element.id);
        }
      });

      const marcas = {marcas: m};
      this.atualizarTotais(marcas);
    })
    .catch(error => this.tratarErro('Não foi possível retornar dados.', 'Erro', <any>error));
  }

  atualizarTotais(marcas: object) {
    this.servico.getTotais(marcas)
    .then(r => {
      this.preencherTotais(r);
      this.buscarAberturasOs(marcas);
      this.buscarFechamentosOs(marcas);
    });
  }

  buscarAberturasOs(marcas: object) {
    const dataIniMesAtual = this.dados.periodo.inicio;
    const dataFimMesAtual = this.dados.periodo.fim;
    const dataIniMesAnterior = new Date(dataIniMesAtual);
    const dataFimMesAnterior = new Date(dataFimMesAtual);

    const diaMesAtual = dataFimMesAnterior.getDate();
    let mesAtual = dataFimMesAnterior.getMonth();
    let anoAtual = dataFimMesAnterior.getFullYear();

    dataIniMesAnterior.setMonth(dataIniMesAnterior.getMonth() - 1);
    dataFimMesAnterior.setMonth(dataFimMesAnterior.getMonth() - 1);

    this.servico.getAberturasOS(dataIniMesAtual, dataFimMesAtual, marcas)
    .then(r => {
      const aberturasMesAtual = r.dados;

      let formatarData: FormatarData;
      formatarData = new FormatarData(0, 0, 0 , 0, 0, 0);

      formatarData.setData(dataIniMesAnterior);
      let strDataIniMesAnterior: string;
      strDataIniMesAnterior = formatarData.getDataString();

      formatarData.setData(dataFimMesAnterior);
      let strDataFimMesAnterior: string;

      if (diaMesAtual > this.getDaysInMonth(mesAtual - 1, anoAtual)) {
          if (mesAtual === 0) {
            anoAtual = anoAtual - 1;
            mesAtual = 11;
          } else {
            mesAtual = mesAtual - 1;
          }
          const x = new FormatarData(anoAtual, mesAtual + 1, this.getDaysInMonth(mesAtual, anoAtual), 0, 0, 0);
          strDataFimMesAnterior = x.getDataString();
      } else {

        strDataFimMesAnterior = formatarData.getDataString();
      }

      this.servico.getAberturasOS(strDataIniMesAnterior, strDataFimMesAnterior, marcas)
      .then(s => {
        const aberturasMesAnterior = s.dados;

    this.preencherAberturasOsMesAtual(aberturasMesAtual);
    this.preencherAberturasOsMesAnterior(aberturasMesAnterior);
      });
    });
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();

  }

  limparArrayLabelQtdAbertura() {
    this.chartQuantidadeAberturaOSLabels = [];
  }

  getLabelsFormatados(dados: any): any {
    let mesDiferente = false;
    let mesAnterior = 0;

    dados.forEach(e => {
      const dia = new Date(e.data).getDate();
      const mes = new Date(e.data).getMonth() + 1;

      if (mesAnterior !== 0 && mesAnterior !== mes) {
        mesDiferente = true;
      }

      e.dia = ((dia < 10) ? '0' + dia.toString() : dia.toString());
      e.mes = ((mes < 10) ? '0' + mes.toString() : mes.toString());
      mesAnterior = mes;
    });

    const retorno = [];
    dados.forEach(e => {
      if (mesDiferente) {
        retorno.push(e.dia + '/' + e.mes);
      } else {
        retorno.push(e.dia);
      }
    });

    return retorno;
  }

  preencherArrayLabelQtdAbertura(labels: any) {
    labels.forEach(e => {
      this.chartQuantidadeAberturaOSLabels.push(e);
    });

  }

  atualizarAberturasOS(marcas: object) {
    this.servico.getAberturasOS(this.dados.periodo.inicio, this.dados.periodo.fim, marcas)
    .then(r => {this.preencherAberturasOsMesAtual(r.dados); });
  }

  buscarFechamentosOs(marcas: object) {
    const dataIniMesAtual = this.dados.periodo.inicio;
    const dataFimMesAtual = this.dados.periodo.fim;
    const dataIniMesAnterior = new Date(dataIniMesAtual);
    const dataFimMesAnterior = new Date(dataFimMesAtual);

    const diaMesAtual = dataFimMesAnterior.getDate();
    let mesAtual = dataFimMesAnterior.getMonth();
    let anoAtual = dataFimMesAnterior.getFullYear();

    dataIniMesAnterior.setMonth(dataIniMesAnterior.getMonth() - 1);
    dataFimMesAnterior.setMonth(dataFimMesAnterior.getMonth() - 1);

    this.servico.getFechamentosOS(dataIniMesAtual, dataFimMesAtual, marcas)
    .then(r => {
    const fechamentosMesAtual = r.dados;

    let formatarData: FormatarData;
    formatarData = new FormatarData(0, 0, 0 , 0, 0, 0);

    formatarData.setData(dataIniMesAnterior);
    let strDataIniMesAnterior: string;
    strDataIniMesAnterior = formatarData.getDataString();

    formatarData.setData(dataFimMesAnterior);
    let strDataFimMesAnterior: string;

    if (diaMesAtual > this.getDaysInMonthFechamento(mesAtual - 1, anoAtual)) {
        if (mesAtual === 0) {
          anoAtual = anoAtual - 1;
          mesAtual = 11;
        } else {
          mesAtual = mesAtual - 1;
        }
        const x = new FormatarData(anoAtual, mesAtual + 1, this.getDaysInMonthFechamento(mesAtual, anoAtual), 0, 0, 0);
        strDataFimMesAnterior = x.getDataString();
    } else {

      strDataFimMesAnterior = formatarData.getDataString();
    }

    this.servico.getFechamentosOS(strDataIniMesAnterior, strDataFimMesAnterior, marcas)
    .then(s => {
      const fechamentosMesAnterior = s.dados;

      this.preencherFechamentosOsMesAtual(fechamentosMesAtual);
      this.preencherFechamentosOsMesAnterior(fechamentosMesAnterior);
    });
  });
}

getDaysInMonthFechamento(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

limparArrayLabelQtdFechamento() {
  this.chartQuantidadeFechamentoOSLabels = [];
}

getLabelsFormatadosFechamento(dados: any): any {
  let mesDiferente = false;
  let mesAnterior = 0;

  dados.forEach(e => {
    const dia = new Date(e.data).getDate();
    const mes = new Date(e.data).getMonth() + 1;
    e.dia += e.dia - 15;
    if (mesAnterior !== 0 && mesAnterior !== mes) {
      mesDiferente = true;
    }
    e.dia = ((dia < 10) ? '0' + dia.toString() : dia.toString());
    e.mes = ((mes < 10) ? '0' + mes.toString() : mes.toString());
    mesAnterior = mes;
  });


  const retorno = [];
  dados.forEach(e => {
    if (mesDiferente) {
      retorno.push(e.dia + '/' + e.mes);
    } else {
      retorno.push(e.dia);
    }
  });

  return retorno;
}

preencherArrayLabelQtdFechamento(labels: any) {
  labels.forEach(e => {
    this.chartQuantidadeFechamentoOSLabels.push(e);
  });

}

  atualizarFechamentosOS(marcas: object) {
    this.servico.getFechamentosOS(this.dados.periodo.inicio, this.dados.periodo.fim, marcas)
    .then(r => {this.preencherFechamentosOsMesAtual(r.dados); });
  }

  preencherFiltroMarcas(dados: any) {
    this.filtroMarcas.forEach(marca => {
      const i: number = dados.map(m => m.id).indexOf(marca.id);
      if (i < 0) {
        this.filtroMarcas.splice(marca);
      }
    });

    dados.forEach(marca => {
      const i: number = this.filtroMarcas.map(m => m.id).indexOf(marca.id);
      if (i < 0) {
        marca.selecionado = true;
        this.filtroMarcas.push(marca);
      }
    });

  }

  preencherTotais(dados: any) {
    this.prepararDados(dados);
    this.dados = dados;
    this.preencherChartValores(dados);
  //  this.prencherChartPercent(dados);
  }

  preencherAberturasOsMesAtual(dados: any) {
    let diaDoMes: number;
    const valor: number[] = [];
    const quantidade: number[] = [];
    let mesDiferente = false;
    let mesAnterior = 0;
    // let primeiraQuinzena = 0;
    // let segundaQuinzena  = 0;

    dados.forEach(e => {

      const dia = new Date(e.data).getDate();
      const mes = new Date(e.data).getMonth() + 1;

      if (mesAnterior !== 0 && mesAnterior !== mes) {
        mesDiferente = true;
      }

      this.dados.quantidade_os_aberta += e.quantidade;
      this.dados.valor_os_aberta += e.valor;

      if (dia < 25) {
      e.quantidade_mes_anterior = 1500;
      e.valor_mes_anterior = e.valor + 50;
      } else {
        e.quantidade_mes_anterior = null;
      e.valor_mes_anterior = e.valor + 50;
    }

      e.dia = ((dia < 10) ? '0' + dia.toString() : dia.toString());
      e.mes = ((mes < 10) ? '0' + mes.toString() : mes.toString());
      diaDoMes = e.dia;
      mesAnterior = mes;
    });

      this.chartQuantidadeAberturaOSLabels = dados.map(e => e.dia);
      this.chartValorAberturaOSLabels = dados.map(e => e.dia);
      this.chartQuantidadeAberturaOSData[1].data = dados.map(e => e.quantidade);
      this.chartValorAberturaOSData[1].data = dados.map(e => e.valor);
      this.carregando = false;
   }

   preencherAberturasOsMesAnterior(dados: any) {
    this.chartQuantidadeAberturaOSData[0].data = dados.map(e => e.quantidade);
    this.dash.reloadChart(false, this.chartQuantidadeAberturaOS);

    this.chartValorAberturaOSData[0].data = dados.map(e => e.valor);
    this.dash.reloadChart(false, this.chartValorAberturaOS);
  }

  preencherFechamentosOsMesAtual(dados: any) {

    let mesDiferente = false;
    let mesAnterior = 0;

    dados.forEach(f => {
      const dia = new Date(f.data).getDate();
      const mes = new Date(f.data).getMonth() + 1;
      if (mesAnterior !== 0 && mesAnterior !== mes) {
        mesDiferente = false;
      }

      this.dados.quantidade_os_fechada += f.quantidade;
      this.dados.valor_os_fechada += f.valor;

      f.dia = ((dia < 10) ? '0' + dia.toString() : dia.toString());
      f.mes = ((mes < 10) ? '0' + mes.toString() : mes.toString());
      mesAnterior = mes;

    });

    if (mesDiferente) {
      this.chartQuantidadeFechamentoOSLabels = dados.map(f => f.dia + '/' + f.mes);
      this.chartValorFechamentoOSLabels = dados.map(f => f.dia + '/' + f.mes);
    } else {
      this.chartQuantidadeFechamentoOSLabels = dados.map(f => f.dia);
      this.chartValorFechamentoOSLabels = dados.map(f => f.dia);
    }

    this.chartQuantidadeFechamentoOSData[1].data = dados.map(f => f.quantidade); // quantidade
    //   this.chartQuantidadeFechamentoOSData[0].data = dados.map(f => f.quantidade_mes_anterior);
    this.dash.reloadChart(false, this.chartQuantidadeFechamentoOS);

    this.chartValorFechamentoOSData[1].data = dados.map(f => f.valor);  // valor
    //   this.chartValorFechamentoOSData[0].data = dados.map(f => f.valor_mes_anterior);
    this.dash.reloadChart(false, this.chartValorFechamentoOS);
  }

  public chartValoresClicked(f: any): void {
  }

  public chartValoresHovered(f: any): void {
  }

  // fechamento de ordens de serviço "mes Anterior quantidade e valor"
  preencherFechamentosOsMesAnterior(dados: any) {

    this.chartQuantidadeFechamentoOSData[0].data = dados.map(f => f.quantidade); // quanidade
    this.dash.reloadChart(false, this.chartQuantidadeFechamentoOS);

    this.chartValorFechamentoOSData[0].data = dados.map(f => f.valor);          // valor
    this.dash.reloadChart(false, this.chartValorFechamentoOS);
  }

  prepararDados(dados: any) {
    dados.quantidade_os_aberta = 0;
    dados.valor_os_aberta = 0;
    dados.quantidade_os_fechada = 0;
    dados.valor_os_fechada = 0;
    dados.total = dados.valor_pecas + dados.valor_mao_obra + dados.valor_acessorios;

    if (dados.total > 0) {
      dados.percentual_pecas = dados.valor_pecas / dados.total * 100;
      dados.percentual_mao_obra = dados.valor_mao_obra / dados.total * 100;
      dados.percentual_acessorios = dados.valor_acessorios / dados.total * 100;
    } else {
      dados.percentual_pecas = 0;
      dados.percentual_mao_obra = 0;
      dados.percentual_acessorios = 0;
    }

  }

  preencherChartValores(dados: any) {
     let valor0: number;
     let valor1: number;
     let valor2: number;
    this.chartValoresLabels[0] = 'Peças: (' + Math.round(dados.percentual_pecas) + '%)';
    this.chartValoresLabels[1] = 'Mão de Obra: (' + Math.round((dados.percentual_mao_obra * 100) / 100)  + '%)';
    this.chartValoresLabels[2] = 'Acessórios: (' + Math.round((this.dados.percentual_acessorios * 100) / 100) + '%)';

    valor0 = dados.percentual_pecas;
    valor1 = dados.percentual_mao_obra;
    valor2 = this.dados.percentual_acessorios;

    this.chartValoresData[0].data[0] = valor0.toFixed(2);
    this.chartValoresData[0].data[1] = valor1.toFixed(2);
    this.chartValoresData[0].data[2] = valor2.toFixed(2);


    this.dash.reloadChart(true, this.chartValores);
  }

  marcar(marca) {
    marca.selecionado = !marca.selecionado;
  }
  tratarErro(mensagem: string, titulo: string, error: any) {
    this.carregando = false;
    console.error(error);
    this.toastr.error(mensagem, titulo);
  }
}
