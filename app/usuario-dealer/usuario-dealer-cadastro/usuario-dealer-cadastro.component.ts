import { Filtros } from './../../comum/crud/Filtro/Filtros';
import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { UsuarioDealerService } from '../usuario-dealer-service/usuario-dealer.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';

@Component({
  selector: 'app-usuario-dealer-cadastro',
  templateUrl: './usuario-dealer-cadastro.component.html',
  styleUrls: ['./usuario-dealer-cadastro.component.css']
})
export class UsuarioDealerCadastroComponent
extends CrudBase
implements OnInit {

  itensAtivo: any;
  itensFuncao: any;

constructor(
  service: UsuarioDealerService,
  toastr: ToastrService
) {
  super(service, toastr);
  this.carregarAtivo();
  this.carregarFuncao();
}

ngOnInit() {
  if (!this.model) {
    this.model = {};
  }
  this.defineModelVazio();
}

private carregarFuncao() {
  this.itensFuncao =
    new ListitemBuilder()
    .build();
}

private carregarAtivo() {
  this.itensAtivo =
  new ListitemBuilder()
    .add(true, 'Ativo')
    .add(false, 'Inativo')
    .build();
}

novo() {
  super.novo();
  this.defineModelVazio();
}

// == [ INICIO: Métodos Auxiliares ] ==
private defineModelVazio() {
  if (this.state === Estado.insert) {
    this.model.id = null;
  }
}
// == [ FIM:    Métodos Auxiliares ] ==

}
