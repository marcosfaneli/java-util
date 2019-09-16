import { RmpvDetalheProdutivoServiceService } from './../rmpv-detalhe-produtivo-service/rmpv-detalhe-produtivo-service.service';
import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from '../../comum/service-base/parametro';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rmpv-detalhe-produtivo-lista',
  templateUrl: './rmpv-detalhe-produtivo-lista.component.html',
  styleUrls: ['./rmpv-detalhe-produtivo-lista.component.css']
})

export class RmpvDetalheProdutivoListaComponent extends ListaBase implements OnInit {
  nome: string;
  maoDeObra = 0;
  maoDeObraHTStrg: string;
  maoDeObraHDStrg: string;
  maoDeObraHT: number;
  maoDeObraHD: number;

  eficiencia = 0;
  eficienciaHVStrg: string;
  eficienciaHDStrg: string;
  eficienciaHV: number;
  eficienciaHD: number;

  produtividade = 0;
  produtividadeHTStrg: string;
  produtividadeHVStrg: string;
  produtividadeHT: number;
  produtividadeHV: number;

  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  configShowNumber = {
    animation: 'count',
    format: '(.ddd),dd'
  };

  constructor(service: RmpvDetalheProdutivoServiceService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = false;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 60;
    this.exibirBotaoDetalhes = false;
    this.exibirBotaoNovo = false;
  }

  ngOnInit() {
    this.buscar();

    this.estrutura = new EstruturaGridViewBuilder()
  //    .addColunaCentralizadaW('id', 'ID', '40px')
      .addColunaW('nome', 'Produtivo', '80px')
      .addColunaNumericaW('HT', 'HT', '80px')
      .addColunaNumericaW('HD', 'HD', '80px')
      .addColunaNumericaW('HV', 'HV', '80px')
      .addColunaCentralizadaW('percentualMaoDeObra', '%', '80px')
      .addColunaCentralizadaW('statusMaoDeObra', 'Status', '80px')
      .addColunaCentralizadaW('percentualProdutividade', '%', '80px')
      .addColunaCentralizadaW('statusProdutividade', 'Status', '80px')
      .addColunaCentralizadaW('percentualEficiencia', '%', '80px')
      .addColunaCentralizadaW('statusEficiencia', 'Status', '80px')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.dealer
      || this.filtros.produtivos
      || this.filtros.data_inicial
      || this.filtros.data_final;
  }

  protected getDados(response: any): any {
//    this.nome = response.dados.nome;
    this.maoDeObra = response.maoDeObra.ideal;

    this.maoDeObraHTStrg = `${response.maoDeObra.horasTrabalhadas}%`;
    this.maoDeObraHDStrg = `${response.maoDeObra.horasDisponiveis}%`;
    this.maoDeObraHT = response.maoDeObra.horasTrabalhadas;
    this.maoDeObraHD = response.maoDeObra.horasDisponiveis;

    this.eficiencia = response.eficiencia.ideal;
    this.eficienciaHVStrg = `${response.eficiencia.horasVendidas}%`;
    this.eficienciaHDStrg = `${ response.eficiencia.horasDisponiveis}%`;
    this.eficienciaHV = response.eficiencia.horasVendidas;
    this.eficienciaHD = response.eficiencia.horasDisponiveis;

    this.produtividade = response.produtividade.ideal;
    this.produtividadeHTStrg = `${response.produtividade.horasTrabalhadas}%`;
    this.produtividadeHVStrg = `${response.produtividade.horasVendidas}%`;
    this.produtividadeHT = response.produtividade.horasTrabalhadas;
    this.produtividadeHV = response.produtividade.horasVendidas;

    this.nome = response.dados[0].nome;
    return response.dados[0].produtivos;
  }

  protected carregarModel(registro: any): Promise<any> {
    const parametros: Parametro[] = [];
    const param = new Parametro('id', registro.registro.produtivos);

    parametros.push(param);

    this.carregando = true;

    return this.service.get(parametros)
      .then(res => {
        this.carregando = false;
        const retorno: any = {};
        retorno.novoCadastro = false;
        retorno.registro = res.dados.produtivos[0];
        return retorno;
      })
      .catch(error => {
        this.carregando = false;
        this.tratarErro('Não foi posível carregar o registro', 'Erro', error);
      })
  }

  voltar() {
    this.router.navigateByUrl("produtividade");
  }
}
