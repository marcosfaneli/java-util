import { Parametro } from './parametro';

export class ParametroMultivalor extends Parametro {

    valores: string[];

    constructor(nome: string, valores: string[]) {
        super(nome, null);
        this.valores = valores;
    }

}
