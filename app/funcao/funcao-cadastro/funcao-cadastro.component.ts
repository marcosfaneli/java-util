import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { FuncaoService } from '../funcao-service/funcao.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';

@Component({
  selector: 'app-funcao-cadastro',
  templateUrl: './funcao-cadastro.component.html',
  styleUrls: ['./funcao-cadastro.component.css']
})
export class FuncaoCadastroComponent extends CrudBase implements OnInit {

  exibirExcluir: boolean = true;

  constructor(service: FuncaoService, toastr: ToastrService) {
    super(service, toastr);
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {};
    }
    this.defineModelVazio();
    this.carregarPermissoes();
  }

  carregarPermissoes() {
    if (this.model.tipo === 'INTERNO') {
      this.exibirExcluir = false;
    }
  }

  novo() {
    super.novo();
    this.defineModelVazio();
  }

  private defineModelVazio() {
    if (this.state === Estado.insert) {
      this.model.id = null;
    }
  }
}
