import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { QuartilService } from '../quartil-service/quartil.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { FormatarData } from '../../comum/formatarData';

@Component({
  selector: 'app-quartil-cadastro',
  templateUrl: './quartil-cadastro.component.html'
})
export class QuartilCadastroComponent
extends CrudBase
implements OnInit {

  constructor(
    service: QuartilService,
    toastr: ToastrService,
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

    private defineModelVazio() {
      if (this.state === Estado.insert) {
        this.model.id = null;
      }
    }

    salvar () {
      if (this.model.data_inicio.day) {
        this.model.data_inicio = new FormatarData(
          this.model.data_inicio.year,
          this.model.data_inicio.month,
          this.model.data_inicio.day,
          0,
          0,
          0
          ).getDataString();
        }
        if (this.model.data_fim.day) {
          this.model.data_fim = new FormatarData(
            this.model.data_fim.year,
            this.model.data_fim.month,
            this.model.data_fim.day,
            0,
            0,
            0
            ).getDataString();
          }
          super.salvar ();

        }

      }
