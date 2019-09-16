import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { GrupoEconomicoService } from '../grupo-economico-service/grupo.economico.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';

@Component({
  selector: 'app-grupo-economico-cadastro',
  templateUrl: './grupo-economico-cadastro.component.html',
  styleUrls: ['./grupo-economico-cadastro.component.css']
})
export class GrupoEconomicoCadastroComponent
extends CrudBase
implements OnInit {

constructor(
  service: GrupoEconomicoService,
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
