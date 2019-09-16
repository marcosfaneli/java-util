// import { PrintInterface } from './IPrintInterface';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IColunaGrid } from './estrutura/IColunaGrid';
import { RetornoSelecao } from './RetornoSelecao';
import { style, animate, trigger, transition } from '@angular/animations';
import { ExportExcelService } from '../excel-service/export-excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css'],
  animations: [
    trigger('animacaoPagina', [
      transition('* => fadeIn', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      transition('* => fadeOut', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => fadeInUp', [
        style({ opacity: '0', transform: 'translateY(-100%)' }),
        animate(500)
      ])
    ])
  ]
})
export class GridviewComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef;

  private linhas = [];

  bindingVar = '';
  exibirNovo = true;
  exibirBotaoAjuda = true;

  // ------------Estrutura RMPV Serviço / Peças ----------
  @Input() Estrutura: IColunaGrid[];
  @Input() EstruturaInterna: IColunaGrid[];
  @Input() EstruturaTotal: IColunaGrid[];
  @Input() total_registros = 0;
  @Input() ListagemComFiltros = false;
  @Input() ExibirBotaoDetalhes = false;
  @Input() ExibirBotaoDetalhesIcon = false;
  @Input() Borda = false;
  @Input() Paginacao = false;
  @Input() QuantidadeRegistrosPagina = 10;
  @Input() PaginaAtual = 1;
  @Input() visualizarTotalRegistros = true;
  @Input() NomeModulo = '';
  @Input() tipoIcon = 'normal';
  @Output() ver: EventEmitter<RetornoSelecao> = new EventEmitter<RetornoSelecao>();
  @Output() mudarQuantidadePorPagina: EventEmitter<number> = new EventEmitter<number>();
  @Output() mudarPaginaAtual: EventEmitter<number> = new EventEmitter<number>();

  ultimaPagina = 0;
  @Input() totalInterna = false; // valor total intera RMPV Servico
  @Input() totalGeral = false;   // valor total geral  RMPV Servico

  @Input() set Dados(dados) {
    this.linhas = dados;
    this.calcularUltimaPagina();
  }

  constructor(private excelService: ExportExcelService) {
  }

  ngOnInit() {
    if (this.Paginacao) {
      this.calcularUltimaPagina();
    } else {
      this.total_registros = this.linhas.length;
    }

  }

  fadeIn() {
    this.bindingVar = 'fadeIn';
  }

  fadeOut() {
    this.bindingVar = 'fadeOut';
  }

  fadeInUp() {
    this.bindingVar = 'fadeInUp';
  }

  calcularUltimaPagina() {
    const decPaginas = this.total_registros / this.QuantidadeRegistrosPagina;
    const intPaginas = Math.trunc(this.total_registros / this.QuantidadeRegistrosPagina);
    if (intPaginas < decPaginas) {
      this.ultimaPagina = intPaginas + 1;
    } else {
      this.ultimaPagina = intPaginas;
    }
  }

  visualizar(registro) {
    const retorno: RetornoSelecao = new RetornoSelecao();
    retorno.novoCadastro = false;
    retorno.registro = registro;
    this.ver.emit(retorno);
  }

  mudarQtdPorPagina() {
    this.PaginaAtual = 1;
    this.fadeInUp();
    this.mudarQuantidadePorPagina.emit(this.QuantidadeRegistrosPagina);
    this.mudarPaginaAtual.emit(this.PaginaAtual);
  }

  irPagina() {
    this.calcularUltimaPagina();
    if (this.PaginaAtual > this.ultimaPagina) {
      this.PaginaAtual = this.ultimaPagina;
    }
    if (this.PaginaAtual < 1) {
      this.PaginaAtual = 1;
    }
    this.fadeInUp();
    this.mudarPaginaAtual.emit(this.PaginaAtual);
  }

  irPrimeiraPagina() {
    if (this.PaginaAtual > 1) {
      this.fadeIn();
      this.PaginaAtual = 1;
      this.mudarPaginaAtual.emit(this.PaginaAtual);
    }
  }

  irPaginaAnterior() {
    if (this.PaginaAtual > 1) {
      this.fadeIn();
      this.PaginaAtual--;
      this.mudarPaginaAtual.emit(this.PaginaAtual);
    }
  }

  irPaginaPosterior() {
    if (this.PaginaAtual < this.ultimaPagina) {
      this.fadeOut();
      this.PaginaAtual++;
      this.mudarPaginaAtual.emit(this.PaginaAtual);
    }
  }

  irUltimaPagina() {
    if (this.PaginaAtual < this.ultimaPagina) {
      this.fadeOut();
      this.PaginaAtual = this.ultimaPagina;
      this.mudarPaginaAtual.emit(this.PaginaAtual);
    }
  }

  set registrosPagina(id: string) {
    if (id) {
      this.QuantidadeRegistrosPagina = +id;
    } else {
      this.QuantidadeRegistrosPagina = null;
    }
  }

  get registrosPagina(): string {
    if (this.QuantidadeRegistrosPagina === null || this.QuantidadeRegistrosPagina === undefined) {
      return '';
    }
    return this.QuantidadeRegistrosPagina.toString();
  }


  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Página 1');

    /* save to file */
    XLSX.writeFile(wb, 'modulo ' + this.NomeModulo + '.xlsx');
  }

}
