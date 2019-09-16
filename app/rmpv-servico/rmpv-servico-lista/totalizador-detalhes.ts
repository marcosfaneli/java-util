export class TotalizadorDetalhes {

    __id: number;
    __nome: string;
    __faturamento = 0.;
    __maoDeObra = 0.;
    __horasVendidas = 0.;
    __horasTrabalhadas = 0.;

    __valorTotal: any;

     constructor(id: number, nome: string) {
         this.__id = id;
         this.__nome = nome;
     }

    set faturamento(valor: number) {
        this.__faturamento = valor;
    }

    get faturamento(): number {
         return this.__faturamento;
    }

    set maoDeObra(valor: number) {
        this.__maoDeObra = valor;
    }

    set horasVendidas(valor: number) {
        this.__horasVendidas = valor;
    }

    set horasTrabalhadas(valor: number) {
        this.__horasTrabalhadas = valor;
    }

    get maoDeObra(): number {
        return this.__maoDeObra;
    }

    get horasVendidas(): number {
        return this.__horasVendidas;
    }

    get horasTrabalhadas(): number {
        return this.__horasTrabalhadas;
    }

    get id(): number {
        return this.__id;
    }

    get nome(): string {
        return this.__nome;
    }

}
