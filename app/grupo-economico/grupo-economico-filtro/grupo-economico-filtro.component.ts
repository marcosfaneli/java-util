import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-economico-filtro',
  templateUrl: './grupo-economico-filtro.component.html',
  styleUrls: ['./grupo-economico-filtro.component.css']
})
export class GrupoEconomicoFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }
}
