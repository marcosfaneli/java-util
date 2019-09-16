import { Paginacao } from './Paginacao';
import { Filtros } from './Filtros';

export class FiltrosComPaginacao
    extends Filtros {

    paginacao: Paginacao;

    constructor() {
        super();
        this.paginacao = new Paginacao();
    }

}
