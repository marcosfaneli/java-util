import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-grupo-importador-filtro',
  templateUrl: './grupo-importador-filtro.component.html',
  styleUrls: ['./grupo-importador-filtro.component.css']
})
export class GrupoImportadorFiltroComponent implements OnInit {

  @Input() filtros: any;

  constructor() { }

  ngOnInit() {
  }
}
