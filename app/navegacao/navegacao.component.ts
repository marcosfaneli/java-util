import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NOME_MARCA } from '../comum/constantes';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent
  implements OnInit {

  logo = NOME_MARCA;
  _menu = [];
  _exibirMenu = false;

  constructor() { }

  ngOnInit() {}

  @Input('menu')
  set menu(value: any[]) {
    this._menu = value;
    this._exibirMenu = this._menu.length > 2;
  }

  getMostrarMenu(): boolean {
    return this._exibirMenu;
  }

}
