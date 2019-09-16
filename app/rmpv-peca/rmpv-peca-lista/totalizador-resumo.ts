export class TotalizadorResumo {
    __id: number;
    __categoria: string;
    __valorLandRover = 0.;
    __valorJaguar = 0.;

    set id(valor: number) {
        this.__id = valor;
    }

    set categoria(valor: string) {
        this.__categoria = valor;
    }

    set valorLandRover(valor: number) {
        this.__valorLandRover = valor;
    }

    set valorJaguar(valor: number) {
        this.__valorJaguar = valor;
    }

    get id(): number {
        return this.__id;
    }

    get categoria(): string {
        return this.__categoria;
    }

    get valorLandRover(): number {
        return this.__valorLandRover;
    }

    get valorJaguar(): number {
        return this.__valorJaguar;
    }

    get total(): number {
        return this.__valorJaguar + this.__valorLandRover;
    }
}
