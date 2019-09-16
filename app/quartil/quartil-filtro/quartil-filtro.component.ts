import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quartil-filtro',
  templateUrl: './quartil-filtro.component.html',
  styleUrls: ['./quartil-filtro.component.css']
})
export class QuartilFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }

}
