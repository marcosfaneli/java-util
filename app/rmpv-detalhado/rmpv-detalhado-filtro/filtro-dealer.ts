import { RmpvDetalhadoFiltroService } from './rmpv-detalhado-filtro.service';

export class FiltroDealers {

  dealers = [];

  constructor(private servico: RmpvDetalhadoFiltroService) { }

  carregar() {
    this.servico.getFiltroDealers()
      .then(r => {
        this.preencher(r.filtros);
      });
  }

  public selecionados(): any {
    let selecionados = [];
    selecionados = this.dealers.filter(m => m.selecionado).map(m => m);

    return selecionados;
  }

  public naoSelecionados(): any {
    let selecionados = [];
    selecionados = this.dealers.filter(m => !m.selecionado).map(m => m);

    return selecionados;
  }

  private preencher(dados: any) {
    this.inserirItens(dados);
  }

  private inserirItens(dados: any) {
    dados.forEach(dealer => {
      const i: number = this.dealers.map(m => m.id).indexOf(dealer.id);
      if (i < 0) {
        const item = {
          'id': dealer.id,
          'nome': dealer.descricao,
          'toTexto': function() { return this.nome},
          'selecionado': false
        };
        this.dealers.push(item);
      }
    });
  }
}
