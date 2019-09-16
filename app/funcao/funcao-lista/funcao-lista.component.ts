import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { FuncaoService } from '../funcao-service/funcao.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcao-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./funcao-lista.component.css']
})
export class FuncaoListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: FuncaoService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 5;
    this.exibirBotaoDetalhes = true;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaCentralizadaW('id', 'ID', '40px')
      .addColuna('descricao', 'Descrição')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id
      || this.filtros.descricao;
  }

}
