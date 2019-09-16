export class TotalizadorResumo {
    __id: number;
    __categoria: string;
    __valorLandRover: any = 0.;
    __valorJaguar: any = 0.;
    __valor: string;

    set id(valor: number) {
        this.__id = valor;
    }

    set categoria(valor: string) {
        this.__categoria = valor;
    }

    set valorLandRover(valor: any) {
        this.__valorLandRover = valor;
    }

    set valorJaguar(valor: any) {
        this.__valorJaguar = valor;
    }

    get id(): number {
        return this.__id;
    }

    get categoria(): string {
        return this.__categoria;
    }

    get valorLandRover(): any {
        return this.__valorLandRover
    }

    get valorJaguar(): any {
        return this.__valorJaguar
    }

    get total(): any {
        return this.__valorJaguar + this.__valorLandRover;
    }


}
