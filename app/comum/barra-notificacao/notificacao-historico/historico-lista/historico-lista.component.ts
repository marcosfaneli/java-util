import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../../../comum/crud/ListaBase';
import { HistoricoService } from '../historico-service/historico.service';
import { EstruturaGridViewBuilder } from '../../../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historico-lista',
  templateUrl: './../../../../template/lista.html', // './historico-lista.component.html',
  styleUrls: ['./historico-lista.component.css']
})
export class HistoricoListaComponent extends ListaBase implements OnInit {
   visualizarTotalRegistros: boolean;
   exibirBotaoDetalhes: boolean;

  constructor(service: HistoricoService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = false;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 10;
    this.exibirBotaoDetalhes = true;
    this.exibirBotaoNovo = false;
    this.exibirBotaoAjuda = false;
    this.exibirBarraCor = false;
  }

  ngOnInit() {
    this.estrutura = new EstruturaGridViewBuilder()
      .addColuna('nomeDealer', 'Dealer')
      .addColuna('veiculoMarca', 'Marca')
      .build();

    this.buscar();

  }

  protected getDados(response: any): any {
    return response.notas;
  }


  protected getListagemComFiltros(): boolean {
    return this.filtros.nomeDealer
        || this.filtros.numeroOs
        || this.filtros.veiculoMarca;
  }

}
