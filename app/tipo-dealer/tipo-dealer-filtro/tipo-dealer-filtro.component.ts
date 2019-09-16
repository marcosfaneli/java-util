import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tipo-dealer-filtro',
  templateUrl: './tipo-dealer-filtro.component.html',
  styleUrls: ['./tipo-dealer-filtro.component.css']
})
export class TipoDealerFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }

}
