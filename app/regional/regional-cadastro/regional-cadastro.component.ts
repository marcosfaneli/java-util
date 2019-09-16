import { RegionalService } from './../regional-service/regional.service';
import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { ListItem } from '../../comum/dropdown-list/ListItem';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';
import { FiltroService } from '../../comum/filtro/filtro.service';

@Component({
  selector: 'app-regional-cadastro',
  templateUrl: './regional-cadastro.component.html',
  styleUrls: ['./regional-cadastro.component.css']
})
export class RegionalCadastroComponent
  extends CrudBase
  implements OnInit {

    habilita: boolean;
    itensRegiao: ListItem[];
    itensUsuarioFabrica: ListItem[];

  constructor(
    service: RegionalService,
    toastr: ToastrService,
    private filtroService: FiltroService
    ) {
    super(service, toastr);
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {};
    }
    this.defineModelVazio();
    this.carregarDDL();
    this.validaEstado(this.state);
  }

novo() {
  super.novo();
  this.defineModelVazio();
  this.habilita = true;
}

validaEstado(estado: number): void {
 if (estado === 1 && 'undefined' ) {
   this.habilita = true;
 } else  {
   this.habilita = false;
 }
}

// == [ INICIO: Métodos Auxiliares ] ==
private carregarDDL() {
  this.carregarDDLRegiao();
  this.carregarDDLUsuarioFabrica();
}

private carregarDDLRegiao() {
  this.itensRegiao = [];
  const builder = new ListitemBuilder();
  this.filtroService.buscar('regiao')
    .then(res => {
      res.filtros.forEach(element => {
        builder.add(element.id, element.descricao);
      });

      this.itensRegiao = builder.build();
    });
}


private carregarDDLUsuarioFabrica() {
  this.itensUsuarioFabrica = [];
  const builder = new ListitemBuilder();
  this.filtroService.buscar('usuario_fabrica')
    .then(res => {
      res.filtros.forEach(element => {
        builder.add(element.id, element.descricao);
      });

      this.itensUsuarioFabrica = builder.build();
    });
}


private defineModelVazio() {
  if (this.state === Estado.insert) {
    this.model.id = null;
    this.model.usuario = {};
    this.model.regiao = {};
    this.model.usuario.id = null;
    this.model.regiao.id = null;
   }
}

}
