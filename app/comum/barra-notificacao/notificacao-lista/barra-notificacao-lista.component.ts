import { BarraNotificacaoService } from './../barra-notificacao.service';
import { HistoricoService } from './../notificacao-historico/historico-service/historico.service';
import { EstruturaGridViewBuilder } from './../../gridview/EstruturaGridViewBuilder';
import { Component, OnInit, Input } from '@angular/core';
import { ListaBase } from '../../../comum/crud/ListaBase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Parametro } from '../../../comum/service-base/parametro';


@Component({
  selector: 'app-barra-notificacao-lista',
  templateUrl: './barra-notificacao-lista.component.html', // '../../../template/lista.html',
  styleUrls: ['./barra-notificacao-lista.component.css']
})

export class BarraNotificacaoListaComponent extends ListaBase implements OnInit {


  constructor(service: BarraNotificacaoService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
//   this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 5;
//    this.exibirBotaoDetalhes = true;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
    .addColunaCentralizadaW('id', 'ID', '40px')
    .addColuna('descricao', 'Descrição')
    .build();
  }

  protected getListagemComFiltros(): boolean {
    return false;
  }

  protected getDados(response: any): any {
    // response.notas.map(x => {
    //           x.collapse = false;
    // });
    return response.notas;
  }

  definirCollapse(item: any) {
    item.collapse = !item.collapse;
  }

}



















// export class BarraNotificacaoListaComponent extends ListaBase implements OnInit {
//    visualizarTotalRegistros: boolean;
//    exibirBotaoDetalhes: boolean;

//   constructor(service: BarraNotificacaoService, toastr: ToastrService, router: Router) {
//     super(service, toastr, router);
//     this.visualizarTotalRegistros = false;
//     this.listagemComPaginacao = true;
//     this.quantidadeRegistrosPagina = 10;
//     this.exibirBotaoDetalhes = true;
//     this.exibirBotaoNovo = false;
//     this.exibirBotaoAjuda = false;
//     this.exibirBarraCor = false;
//   }

//   ngOnInit() {
//     this.estrutura = new EstruturaGridViewBuilder()
//       .addColuna('nomeDealer', 'Dealer')
//       .addColuna('veiculoMarca', 'Marca')
//       .build();

//     this.buscar();
//   }

//   protected getDados(response: any): any {
//     return response.notas;
//   }

//   protected getListagemComFiltros(): boolean {
//     return this.filtros.nomeDealer
//         || this.filtros.numeroOs
//         || this.filtros.veiculoMarca;
//   }

// }
