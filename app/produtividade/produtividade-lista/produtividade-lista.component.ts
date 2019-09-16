import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { ProdutividadeService } from '../produtividade-service/produtividade.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from '../../comum/service-base/parametro';
import { Router } from '@angular/router';
import { RetornoSelecao } from '../../comum/gridview/RetornoSelecao';

@Component({
  selector: 'app-produtividade-lista',
  templateUrl: './produtividade-lista.component.html',
  styleUrls: ['./produtividade-lista.component.css']
})
export class ProdutividadeListaComponent extends ListaBase implements OnInit {

  maoDeObra = 0;
  maoDeObraHT: number;
  maoDeObraHD: number;
  maoDeObraHTStrg: string;
  maoDeObraHDStrg: string;

  eficiencia = 0;
  eficienciaHV: number;
  eficienciaHD: number;
  eficienciaHVStrg: string;
  eficienciaHDStrg: string;

  produtividade = 0;
  produtividadeHT: number;
  produtividadeHV: number;
  produtividadeHTStrg: string;
  produtividadeHVStrg: string;

  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  configShowNumber = {
    animation: 'count',
    format: '(.ddd),dd'
  };

  constructor(service: ProdutividadeService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 10;
    this.exibirBotaoDetalhes = true;
    this.exibirBotaoNovo = false;
    this.exibirBotaoDetalhesIcon = true;
    this.nomeModulo = 'produtividade';
  }

  ngOnInit() {
    this.buscar();

    this.estrutura = new EstruturaGridViewBuilder()
      //    .addColunaCentralizadaW('id', 'ID', '40px')
      .addColunaW('nome', 'Dealer', '80px')
      .addColunaNumericaW('HT', 'HT', '80px')
      .addColunaNumericaW('HD', 'HD', '80px')
      .addColunaNumericaW('HV', 'HV', '80px')
      .addColunaCentralizadaW('percentualEficiencia', '%', '80px')
      .addColunaCentralizadaW('statusEficiencia', 'Status', '80px')
      .addColunaCentralizadaW('percentualMaoDeObra', '%', '80px')
      .addColunaCentralizadaW('statusMaoDeObra', 'Status', '80px')
      .addColunaCentralizadaW('percentualProdutividade', '%', '80px')
      .addColunaCentralizadaW('statusProdutividade', 'Status', '80px')
      .build();
  }


  protected getListagemComFiltros(): boolean {
    return this.filtros.grupo_economico
      || this.filtros.dealer
      || this.filtros.regiao
      || this.filtros.data_inicial
      || this.filtros.data_final;
  }

  protected getDados(response: any): any {
    this.maoDeObra = response.maoDeObra.ideal;
    this.maoDeObraHT = response.maoDeObra.horasTrabalhadas;
    this.maoDeObraHD = response.maoDeObra.horasDisponiveis;
    this.maoDeObraHTStrg = `${response.maoDeObra.horasTrabalhadas}%`;
    this.maoDeObraHDStrg = `${response.maoDeObra.horasDisponiveis}%`;

    this.eficiencia = response.eficiencia.ideal;
    this.eficienciaHV = response.eficiencia.horasVendidas;
    this.eficienciaHD = response.eficiencia.horasDisponiveis;
    this.eficienciaHVStrg = `${response.eficiencia.horasVendidas}%`;
    this.eficienciaHDStrg = `${response.eficiencia.horasDisponiveis}%`;

    this.produtividade = response.produtividade.ideal;
    this.produtividadeHT = response.produtividade.horasTrabalhadas;
    this.produtividadeHV = response.produtividade.horasVendidas;
    this.produtividadeHTStrg = `${response.produtividade.horasTrabalhadas}%`;
    this.produtividadeHVStrg = `${response.produtividade.horasVendidas}%`;

    return response.dados;
  }

  protected carregarModel(registro: any): Promise<any> {

    const parametros: Parametro[] = [];
    const param = new Parametro('id', registro.registro);
    parametros.push(param);

    this.carregando = true;

    return this.service.get(parametros)
      .then(res => {
        this.carregando = false;
        const retorno: any = {};
        retorno.novoCadastro = false;
        retorno.registro = res.dados[0];

        return retorno;
      })
      .catch(error => {
        this.carregando = false;
        this.tratarErro('Não foi posível carregar o registro', 'Erro', error);
      })
  }

  ver(registro: RetornoSelecao) {
    const IdDealer = registro.registro.id;
    let url = '';
    for (const filtro in this.filtros) {
      if (this.filtros.hasOwnProperty(filtro)) {
        url += url ? '&' + filtro + '=' + this.filtros[filtro] : '?' + filtro + '=' + this.filtros[filtro];
      }
    }
    if (url.indexOf('dealer') === -1) {
      this.router.navigateByUrl('produtividade/dealer/produtivo' + url + '&' + 'dealer=' + IdDealer);
    } else {
      this.router.navigateByUrl('produtividade/dealer/produtivo' + url);
    }
  }

}