import { Component, OnInit /** Output, Input, EventEmitter */ } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { DealerService } from '../dealer-service/dealer.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from '../../comum/service-base/parametro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./dealer-lista.component.css']
})
export class DealerListaComponent
  extends ListaBase
  implements OnInit {

  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: DealerService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 10;
    this.exibirBotaoDetalhes = true;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaCentralizadaW('id', 'ID', '40px')
      .addColuna('nome', 'Descrição')
      .addColuna('cnpj', 'CNPJ')
      .addColuna('codigo', 'Dealer code')
      .addColunaBooleanW('status', 'Ativo', '100px')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.descricao
      || this.filtros.cnpj
      || this.filtros.codigo;
  }

  protected carregarModel(registro: any): Promise<any> {

    const parametros: Parametro[] = [];
    const param = new Parametro('id', registro.registro.id);
    parametros.push(param);

    this.carregando = true;

    return this.service.get(parametros)
      .then(res => {
        const retorno: any = {};
        retorno.novoCadastro = false;
        retorno.registro = res.dados[0];
        this.carregando = false;

        return retorno;
      })
      .catch(error => {
        this.tratarErro('Não foi posível carregar o registro', 'Erro', <any>error);
      })
  }
}
