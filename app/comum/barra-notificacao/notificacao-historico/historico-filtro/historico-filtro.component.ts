import { FiltroService } from './../../../filtro/filtro.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-historico-filtro',
  templateUrl: './historico-filtro.component.html',
  styleUrls: ['./historico-filtro.component.css']
})
export class HistoricoFiltroComponent implements OnInit {

  @Input() filtros: any;
  nomeDealer = [];

  constructor(private servico: FiltroService) {
    this.filtros = {};
   }

  ngOnInit() {
    this.preencherDealers();
  }

  preencherDealers() {
    this.servico.buscar('dealer')
      .then(r => { this.nomeDealer = r.filtros; });
  }

  set Dealer(id: string) { this.filtros.nomeDealer = this.tratarSetDropDown(id); }
  get Dealer(): string { return this.tratarGetDropDown(this.filtros.nomeDealer); }

  tratarSetDropDown(id: string): number {
    if (id) {
      return +id;
    } else {
      return null;
    }
  }

  tratarGetDropDown(selecionado: any): string {
    if (selecionado === null || selecionado === undefined) {
      return '';
    }
    return selecionado;
  }

}
