import { RmpvDetalhadoFiltroService } from './rmpv-detalhado-filtro.service';

export class FiltroMarcas {

  marcas = [];

  constructor(private servico: RmpvDetalhadoFiltroService) { }

  public carregar() {
    this.servico.getFiltroMarcas()
    .then(r => {
      this.preencher(r.dados);
    });
  }

  public selecionados(): any {
    let selecionados = [];
    selecionados = this.marcas.filter(m => m.selecionado).map(m => m);

    return selecionados;
  }

  public naoSelecionados(): any {
    let selecionados = [];
    selecionados = this.marcas.filter(m => !m.selecionado).map(m => m);

    return selecionados;
  }

  private preencher(dados: any) {
    dados.forEach(marca => {
      const i: number = this.marcas.map(m => m.id).indexOf(marca.id);
      if (i < 0) {
        marca.selecionado = true;
        marca.toTexto = function() { return this.nome};
        this.marcas.push(marca);
      }
    });
  }
}
