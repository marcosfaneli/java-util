export class TotalizadorDetalhes {

    private _id: number;
    private _nome: string;
    private _original = 0.;
    private _paralelo = 0.;
    private _lubrificante = 0.;
    private _pneu = 0.;

    constructor(id: number, nome: string) {
        this._id = id;
        this._nome = nome;
    }

    set original(valor: number) {
        this._original = valor;
    }

    get original(): number {
        return this._original;
    }

    set paralelo(valor: number) {
        this._paralelo = valor;
    }

    set lubrificante(valor: number) {
        this._lubrificante = valor;
    }

    set pneu(valor: number) {
        this._pneu = valor;
    }

    get paralelo(): number {
        return this._paralelo;
    }

    get lubrificante(): number {
        return this._lubrificante;
    }

    get pneu(): number {
        return this._pneu;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }
}
