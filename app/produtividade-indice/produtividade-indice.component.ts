import { Component, OnInit } from '@angular/core';
import { Estado } from '../comum/shared/estado.enum';
import { RetornoSelecao } from '../comum/gridview/RetornoSelecao';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-produtividade-indice',
  templateUrl: './produtividade-indice.component.html',
  styleUrls: ['./produtividade-indice.component.css']
})
export class ProdutividadeIndiceComponent implements OnInit {

  selecionado: object;
  state: Estado = Estado.view;

  constructor() {

  }

  ngOnInit() {

  }

  buscar() {
    this.selecionado = undefined;
    this.state = Estado.view;
  }

  selecionar(selecionado: RetornoSelecao) {
    console.log(selecionado);

    this.state = Estado.view;

    this.selecionado = selecionado.registro;
  }

}
