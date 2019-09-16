import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-regional-filtro',
  templateUrl: './regional-filtro.component.html',
  styleUrls: ['./regional-filtro.component.css']
})
export class RegionalFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }

}
