import { Component, OnInit } from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-usuario-fabrica',
  templateUrl: './usuario-fabrica.component.html',
  styleUrls: ['./usuario-fabrica.component.css']
})
export class UsuarioFabricaComponent
  implements OnInit {

  selecionado: object;
  state: Estado = Estado.view;

  filtros = {};

  constructor() { }

  ngOnInit() {
  }

  buscar() {
    this.selecionado = undefined;
    this.state = Estado.view;
  }

  selecionar(selecionado: RetornoSelecao) {
    if (selecionado.novoCadastro) {
      this.state = Estado.insert;
    } else {
      this.state = Estado.view;
    }
    this.selecionado = selecionado.registro;
  }

  definirFiltro(): void {
    $('#usuario-fabrica-filtro').modal();
  }

}
