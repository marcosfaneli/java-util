import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-funcao-filtro',
  templateUrl: './funcao-filtro.component.html',
  styleUrls: ['./funcao-filtro.component.css']
})
export class FuncaoFiltroComponent implements OnInit {

  @Input() filtros: any;


  constructor() { }

  ngOnInit() {
  }

}
