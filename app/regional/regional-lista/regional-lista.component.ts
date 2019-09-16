import { ParametroRegional} from './../../comum/service-base/parametro_regional';
import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { RegionalService } from '../regional-service/regional.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regional-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./regional-lista.component.css']
})
export class RegionalListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: RegionalService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 5;
    this.exibirBotaoDetalhes = true;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
      .addColuna('usuario_nome', 'Usuário')
      .addColuna('regiao_nome', 'Região')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id_usuario
      || this.filtros.id_regiao;
  }


  protected carregarModel(registro: any): Promise<any> {
    const parametros: ParametroRegional[] = [];
    const param = new ParametroRegional('id', registro.registro.id,
                                        registro.registro.usuario.id,
                                        registro.registro.regiao.id);
    parametros.push(param);
    this.carregando = true;

    return this.service.get(parametros)
      .then(res => {
        const retorno: any = {};
//        retorno.novoCadastro = false;
        retorno.registro = res.dados[0];
        this.carregando = false;

        return retorno;
      })
      .catch(error => {
        this.tratarErro('Não foi posível carregar o registro', 'Erro', <any>error);
      })
  }
}
