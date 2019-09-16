import { Component, OnInit, Input } from '@angular/core';
import { IComponenteColunaGrid } from '../../IComponenteColunaGrid';

@Component({
  selector: 'app-coluna-grid-numerica',
  templateUrl: './coluna-grid-numerica.component.html',
  styleUrls: ['./coluna-grid-numerica.component.css']
})
export class ColunaGridNumericaComponent implements OnInit, IComponenteColunaGrid {

  @Input() Dados: number;

  constructor() { }

  ngOnInit() {
  }

}
