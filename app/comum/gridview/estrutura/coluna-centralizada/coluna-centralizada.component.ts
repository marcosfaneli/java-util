import { Component, OnInit, Input } from '@angular/core';
import { IComponenteColunaGrid } from '../../IComponenteColunaGrid';

@Component({
  selector: 'app-coluna-centralizada',
  templateUrl: './coluna-centralizada.component.html',
  styleUrls: ['./coluna-centralizada.component.css']
})
export class ColunaCentralizadaComponent implements OnInit, IComponenteColunaGrid {

  @Input() Dados: any;

  constructor() { }

  ngOnInit() {
  }

}
