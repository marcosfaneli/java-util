import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dealer-filtro',
  templateUrl: './dealer-filtro.component.html',
  styleUrls: ['./dealer-filtro.component.css']
})
export class DealerFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }

}
