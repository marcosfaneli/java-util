import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { GrupoEconomicoService } from '../grupo-economico-service/grupo.economico.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-economico-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./grupo-economico-lista.component.css']
})
export class GrupoEconomicoListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: GrupoEconomicoService, toastr: ToastrService, router: Router) {
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
