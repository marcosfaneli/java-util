import { Component, OnInit, Input } from '@angular/core';
import { CrudBase } from '../../../../comum/crud/CrudBase';
import { ToastrService } from 'ngx-toastr';
import {HistoricoService} from '../../notificacao-historico/historico-service/historico.service';
import { Estado } from '../../../../comum/shared/estado.enum';

@Component({
  selector: 'app-historico-cadastro',
  templateUrl: './historico-cadastro.component.html',
  styleUrls: ['./historico-cadastro.component.css']
})
export class HistoricoCadastroComponent extends CrudBase implements OnInit {

  constructor( service: HistoricoService, toastr: ToastrService) {
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

  private defineModelVazio() {
    if (this.state === Estado.insert) {
      this.model.id = null;
    }
  }

}
