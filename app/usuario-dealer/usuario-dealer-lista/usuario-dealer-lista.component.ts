import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { UsuarioDealerService } from '../usuario-dealer-service/usuario-dealer.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-dealer-lista',
  templateUrl: '../../template/lista.html',
  styleUrls: ['./usuario-dealer-lista.component.css']
})
export class UsuarioDealerListaComponent
  extends ListaBase
  implements OnInit {
  visualizarTotalRegistros: boolean;

  constructor(service: UsuarioDealerService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = true;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 5;
  }

  ngOnInit() {
    this.buscar();
    this.estrutura = new EstruturaGridViewBuilder()
      .addColunaNumericaWIcon('id', 'ID', '140px', 'Icon')
      .addColuna('dealer', 'Dealer')
      .addColuna('nome', 'Nome')
      .addColuna('login', 'Login')
      .addColuna('email', 'E-mail')
      .addColunaBooleanW('ativo', 'Ativo', '40px')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.id
    || this.filtros.dealer
    || this.filtros.nome
    || this.filtros.login
    || this.filtros.email
    || this.filtros.funcao
    || this.filtros.ativo;
  }

}
