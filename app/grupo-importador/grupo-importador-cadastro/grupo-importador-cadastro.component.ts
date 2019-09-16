import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { GrupoImportadorService } from '../grupo-importador-service/grupo.importador.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';

@Component({
  selector: 'app-grupo-importador-cadastro',
  templateUrl: './grupo-importador-cadastro.component.html',
  styleUrls: ['./grupo-importador-cadastro.component.css']
})
export class GrupoImportadorCadastroComponent
extends CrudBase
implements OnInit {

constructor(
  service: GrupoImportadorService,
  toastr: ToastrService
) {
  super(service, toastr);
}

ngOnInit() {
  if (!this.model) {
    this.model = {};
  }
  this.defineModelVazio();
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
