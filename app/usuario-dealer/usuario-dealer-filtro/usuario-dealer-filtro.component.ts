import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-dealer-filtro',
  templateUrl: './usuario-dealer-filtro.component.html',
  styleUrls: ['./usuario-dealer-filtro.component.css']
})
export class UsuarioDealerFiltroComponent
  implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }

}
