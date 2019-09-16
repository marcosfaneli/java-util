import { RmpvDetalhadoFiltroService } from './rmpv-detalhado-filtro.service';

export class FiltroTipoOs {

    tipos = [];

    constructor(private servico: RmpvDetalhadoFiltroService) { }

    carregar(): any {
        this.servico.getFiltroTipos()
            .then(r => {
                this.preencher(r.dados);
                return this.tipos;
            });
    }


    public selecionados(): any {
        let selecionados = [];
        selecionados = this.tipos.filter(m => m.selecionado).map(m => m);

        return selecionados;
    }

    public naoSelecionados(): any {
        let selecionados = [];
        selecionados = this.tipos.filter(m => !m.selecionado).map(m => m);

        return selecionados;
    }

    private preencher(dados: any) {
        this.inserirItens(dados);
    }

    private inserirItens(dados: any) {
        dados.forEach(tipo => {
            const i: number = this.tipos.map(m => m.id).indexOf(tipo.id);
            if (i < 0) {
                const item = {
                    'id': tipo.id,
                    'nome': tipo.tipo,
                    'toTexto': function () { return this.nome },
                    'selecionado': false
                };
                this.tipos.push(item);
            }
        });
    }
}
