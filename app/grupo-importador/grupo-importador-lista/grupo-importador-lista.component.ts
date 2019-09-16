import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { GrupoImportadorService } from '../grupo-importador-service/grupo.importador.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-importador-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./grupo-importador-lista.component.css']
})
export class GrupoImportadorListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: GrupoImportadorService, toastr: ToastrService, router: Router) {
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
