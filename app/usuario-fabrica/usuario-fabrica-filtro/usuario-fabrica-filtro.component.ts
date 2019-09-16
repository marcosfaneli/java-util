import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-fabrica-filtro',
  templateUrl: './usuario-fabrica-filtro.component.html',
  styleUrls: ['./usuario-fabrica-filtro.component.css']
})
export class UsuarioFabricaFiltroComponent
  implements OnInit {

  @Input() filtros: any;

  constructor() {
  }

  ngOnInit() {
  }

}
