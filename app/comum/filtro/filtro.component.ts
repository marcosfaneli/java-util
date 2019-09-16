import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FiltroService } from './filtro.service';
import { ListItem } from '../dropdown-list/ListItem';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private _filtro: string;
  @Output() filtrar = new EventEmitter();
  private itens: ListItem[];
  private rotulo = 'Filtro';

  constructor(private service: FiltroService) { }

  ngOnInit() {
    this.carregar();
  }

  @Input() set filtro(valor: string) {
    this._filtro = valor;
  }

  get filtro(): string {
    return this._filtro;
  }

  carregar() {
    const url = this.filtro;

    this.itens = [];
    const builder = new ListitemBuilder();
    this.service.buscar(url)
      .then(res => {

        this.rotulo = res.rotulo;

        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itens = builder.build();
      });
  }

  selecionar(item) {
    this.filtrar.emit(item);
  }

}
