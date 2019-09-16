import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { TipoDealerService } from '../tipo-dealer-service/tipo.dealer.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';

@Component({
  selector: 'app-tipo-dealer-cadastro',
  templateUrl: './tipo-dealer-cadastro.component.html',
  styleUrls: ['./tipo-dealer-cadastro.component.css']
})
export class TipoDealerCadastroComponent
extends CrudBase
implements OnInit {

  itensTipo: any;

  constructor(
    service: TipoDealerService,
    toastr: ToastrService
  ) {
    super(service, toastr);
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {};
    }
    this.defineModelVazio();
    this.carregarTipo();
  }

  private carregarTipo() {
    this.itensTipo =
    new ListitemBuilder()
      .add('1S', '1S')
      .add('2S', '2S')
      .add('3S', '3S')
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
      this.model.tipo = '';
    }
  }
  // == [ FIM:    Métodos Auxiliares ] ==

}
