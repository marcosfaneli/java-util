import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComunicadoService } from './service/comunicado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  styleUrls: ['./comunicado.component.css']
})
export class ComunicadoComponent implements OnInit {
  paginaAtual = 1;
  quantidadeDePaginas = 1;
  totalDeRegistros = 0;
  comunicados = [];
  selecionado: any;
  incluindo = false;
  carregando = true;
  ativaComunicado = true;

  constructor(private service: ComunicadoService, private toast: ToastrService) { }

  ngOnInit() {
    this.carregarLista(1);
  }

  private carregarLista(pagina: number) {
    this.service.buscarComunicados(pagina)
      .then(res => {
        this.comunicados = res.dados;
        this.totalDeRegistros = res.totalRegistros;
        this.paginaAtual = res.paginaAtual;
        this.quantidadeDePaginas = res.quantidadeDePaginas;
        this.carregando = false;
      })
      .catch(error => {
        this.toast.error(error, 'Erro');
        this.carregando = false;
      });
  }

  private exibir(id: number) {
    if (!this.incluindo) {
      this.service.oberPeloId(id)
        .then(res => {
          this.selecionado = res.dados[0];
          const item = this.comunicados.filter(p => p.id === id)[0];
          item.lido = true;
        })
        .catch(error => this.toast.error(error.json().error));
    }
  }

  private getEstado(): boolean {
    return this.incluindo;
  }

  private setEstado(value: boolean) {
    this.incluindo = value;
  }

  private novoComunicado(): void {
    this.incluindo = true;
    this.selecionado = null;
  }

  private setEstadoComunicado(estado: boolean): void {
    this.ativaComunicado = estado;
  }

  private irParaPagina(pagina: number): void {
    const value = pagina <= 0 ? 1 : pagina > this.quantidadeDePaginas ? this.quantidadeDePaginas : pagina;
    this.carregarLista(value);
  }

  marcarComoNaoLido(selecionado: any): void {
    this.service.marcarComoNaoLido(selecionado.id)
      .then(res => {
        this.toast.info('Comunicado marcado como não lido', 'Informação');

        const item = this.comunicados.filter(p => p.id === selecionado.id)[0];
        item.lido = false;
      })
      .catch(erro => this.toast.error(erro.json().erro, 'Erro'));
  }
}
