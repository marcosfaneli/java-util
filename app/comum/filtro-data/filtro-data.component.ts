import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-data',
  templateUrl: './filtro-data.component.html',
  styleUrls: ['./filtro-data.component.css']
})
export class FiltroDataComponent implements OnInit {
  model: Date;

  @Input() filtros: any;

  @Output() selecionar = new EventEmitter();
  @Input() rotulo: string;
  private _dataInicial;

    // data inicial valida
//    public min: number = Date().toString('2008, 0, 1, 0, 0');

    // data final valida

  constructor() {
    const data = new Date();
    this.data = {'year': data.getFullYear(), 'month': data.getMonth() + 1, 'day': data.getDate()};
  }

  ngOnInit() { }

  @Input('data')
  get data(): any {
    return this._dataInicial;
  }

  set data(valor) {
    this._dataInicial = valor;
    this.selecionar.emit(this._dataInicial);
  }

}
