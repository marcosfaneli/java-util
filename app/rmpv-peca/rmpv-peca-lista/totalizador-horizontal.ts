import { IColunaGrid } from '../../comum/gridview/estrutura/IColunaGrid';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';

export class TotalizadorHorizontal {

    categorias: any[] = [];

    constructor() { }

    public processar(marcas: any[]) {
        marcas.forEach(element => {
            if (element.id === 40 || element.id === 31) {
                this.criarCategoria(element.dados);
            }
        });
    }

    private criarCategoria(dados: any[]) {
        dados.forEach(item => {
            const index = this.categorias.findIndex((element) => element.id === item.id);

            let categoria: any;

            if (index >= 0) {
                categoria = this.categorias[index];
            } else {
                categoria = {};

                categoria.id = item.id;
                categoria.nome = item.nome;
                categoria.interna = item.interna;
                categoria.valor = 0;

                this.categorias.push(categoria);
            }
            categoria.valor += item.original + item.paralelo + item.lubrificante + item.pneu;
        });
    }

    public dados(): any[] {
        const resultado: any[] = [];

        const obj = {};

        let internas = 0;
        let total = 0;

        this.categorias.forEach(item => {
            obj['c' + item.id] = item.valor;
            total += item.valor;
            internas += item.interna ? item.valor : 0;
        });

        obj['internas'] = internas;
        obj['total'] = total;

        resultado.push(obj);

        return resultado;
    }

    public total(): any[] {
        return [];
    }

    public grid(): IColunaGrid[] {
        const builder = new EstruturaGridViewBuilder();

        this.categorias.forEach(item => {
            builder.addColunaNumericaFormatada('c' + item.id, item.nome);
        });

        builder
            .addColunaNumericaFormatada('internas', 'Total internas')
            .addColunaNumericaFormatada('total', 'Total')

        return builder.build();
    }
}
