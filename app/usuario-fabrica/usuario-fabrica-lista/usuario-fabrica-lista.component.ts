import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { UsuarioFabricaService } from '../usuario-fabrica-service/usuario-fabrica.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from '../../comum/service-base/parametro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-fabrica-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./usuario-fabrica-lista.component.css']
})
export class UsuarioFabricaListaComponent
  extends ListaBase
  implements OnInit {

  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: UsuarioFabricaService, toastr: ToastrService, router: Router) {
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
      .addColuna('nome', 'Nome')
      .addColuna('email', 'E-mail' )
      .addColuna('login', 'Login' )
      .addColunaBooleanW('ativo', 'Status', '40px' )
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id
    || this.filtros.nome
    || this.filtros.login
    || this.filtros.email
    || this.filtros.status
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
