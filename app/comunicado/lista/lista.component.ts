import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() comunicados = [];
  @Output() selecionado = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  private exibir(id: number) {
    this.selecionado.emit(id);
  }

  private getCor(lido: boolean): any {
    return lido
      ? {'background-color': 'white'}
      : {'background-color': 'bisque'};
  }

}
