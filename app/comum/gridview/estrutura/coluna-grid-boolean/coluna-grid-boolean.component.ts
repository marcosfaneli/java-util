import { Component, OnInit, Input } from '@angular/core';
import { IComponenteColunaGrid } from '../../IComponenteColunaGrid';

@Component({
  selector: 'app-coluna-grid-boolean',
  templateUrl: './coluna-grid-boolean.component.html',
  styleUrls: ['./coluna-grid-boolean.component.css']
})
export class ColunaGridBooleanComponent implements OnInit, IComponenteColunaGrid {

  @Input() Dados: any;

  constructor() { }

  ngOnInit() {
  }

}
