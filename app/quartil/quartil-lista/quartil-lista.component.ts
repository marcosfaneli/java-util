import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { QuartilService } from '../quartil-service/quartil.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { FormatarData } from '../../comum/formatarData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quartil-lista',
  templateUrl: '../../template/lista.html',
})

export class QuartilListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;
  exibirBotaoDetalhes: boolean;

  constructor(service: QuartilService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 5;
    this.exibirBotaoDetalhes = true;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaCentralizadaW ('id', 'ID', '40px')
      .addColuna('descricao', 'Descrição')
      .addColunaCentralizadaW('data_inicio_grid', 'Data Início', '100px')
      .addColunaCentralizadaW('data_fim_grid', 'Data Final', '100px')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id
      || this.filtros.descricao;
  }
  
  getDados(response: any): any {
    const fd = new FormatarData (0, 0, 0, 0, 0, 0);
    response.dados.forEach(element => {
      fd.setData(new Date(element.data_inicio));
      element.data_inicio_grid = fd.getDataFormatada();
      fd.setData(new Date(element.data_fim));
      element.data_fim_grid = fd.getDataFormatada();
    });
    return response.dados;
  }

}
