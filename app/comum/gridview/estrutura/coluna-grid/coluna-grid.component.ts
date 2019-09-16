import { Component, OnInit, Input } from '@angular/core';
import { IComponenteColunaGrid } from '../../IComponenteColunaGrid';

@Component({
  selector: 'app-coluna-grid',
  templateUrl: './coluna-grid.component.html',
  styleUrls: ['./coluna-grid.component.css']
})
export class ColunaGridComponent implements OnInit, IComponenteColunaGrid {

  @Input() Dados: any;

  constructor() { }

  ngOnInit() {
  }

}
