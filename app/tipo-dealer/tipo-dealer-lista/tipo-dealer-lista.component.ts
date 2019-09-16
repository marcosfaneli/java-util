import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { TipoDealerService } from '../tipo-dealer-service/tipo.dealer.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-dealer-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./tipo-dealer-lista.component.css']
})
export class TipoDealerListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: TipoDealerService, toastr: ToastrService, router: Router) {
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
      .addColunaW('tipo', 'Tipo', '60px')
      .addColuna('descricao', 'Descrição')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id
    || this.filtros.tipo
    || this.filtros.descricao;
  }
}
