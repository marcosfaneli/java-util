import { Component, OnInit, Input } from '@angular/core';
import { IComponenteColunaGrid } from '../../IComponenteColunaGrid';

@Component({
  selector: 'app-coluna-grid-numerica-formatada',
  templateUrl: './coluna-grid-numerica-formatada.component.html',
  styleUrls: ['./coluna-grid-numerica-formatada.component.css']
})
export class ColunaGridNumericaFormatadaComponent implements OnInit, IComponenteColunaGrid {

  @Input() Dados: any;

  constructor() { }

  ngOnInit() {
  }

}
