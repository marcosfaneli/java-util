import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FiltroService } from '../../comum/filtro/filtro.service';

@Component({
  selector: 'app-rmpv-detalhado-filtro',
  templateUrl: './rmpv-detalhado-filtro.component.html',
  styleUrls: ['./rmpv-detalhado-filtro.component.css']
})
export class RmpvDetalhadoFiltroComponent implements OnInit {

  gruposEconomicos = [];
  @Output() atualizando = new EventEmitter();
  @Input() filtros: any;

  constructor(private detalhado: FiltroService) {
    this.filtros = {};
  }

  ngOnInit() {
    this.preencherGruposEconomicos();
  }

  preencherGruposEconomicos() {
    this.detalhado.buscar('grupo_economico')
      .then(r => { this.gruposEconomicos = r.filtros; });
  }

  set GrupoEconomico(id: string) { this.filtros.grupo_economico = this.tratarSetDropDown(id); }
  get GrupoEconomico(): string { return this.tratarGetDropDown(this.filtros.grupo_economico); }

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

  limparDataInicial(dataInicialView) {
    dataInicialView._elRef.nativeElement.value = '';
    this.filtros.data_inicial = '';
  }

  limparDataFinal(dataFinalView) {
    dataFinalView._elRef.nativeElement.value = '';
    this.filtros.data_final = '';
  }

  buscarRegistros() {
    this.atualizando.emit(true);
  }

}
