import { IColunaGrid } from './estrutura/IColunaGrid';
import { ColunaGrid } from './estrutura/ColunaGrid';
import { ColunaGridBoolean } from './estrutura/ColunaGridBoolean';
import { ColunaGridNumerica } from './estrutura/ColunaGridNumerica';
import { ColunaGridCentralizada } from './estrutura/ColunaGridCentralizada';
import { ColunaGridNumericaFormatada } from './estrutura/ColunaGridNumericaFormatada';

export class EstruturaGridViewBuilder {

    colunas: IColunaGrid[] = [];

    constructor() {}

    build(): IColunaGrid[] {
        return this.colunas;
    }

    addColuna(field: string, headerText: string): EstruturaGridViewBuilder {
        this.colunas.push(new ColunaGrid(field, headerText));
        return this;
    }

    addColunaW(field: string, headerText: string, width: string): EstruturaGridViewBuilder {
        const coluna = new ColunaGrid(field, headerText);
        coluna.setWidth(width);
        this.colunas.push(coluna);
        return this;
    }

    addColunaCentralizada(field: string, headerText: string): EstruturaGridViewBuilder {
        this.colunas.push(new ColunaGridCentralizada(field, headerText));
        return this;
    }

    addColunaCentralizadaW(field: string, headerText: string, width: string): EstruturaGridViewBuilder {
        const coluna = new ColunaGridCentralizada(field, headerText);
        coluna.setWidth(width);
        this.colunas.push(coluna);
        return this;
    }


    addColunaBoolean(field: string, headerText: string): EstruturaGridViewBuilder {
        this.colunas.push(new ColunaGridBoolean(field, headerText));
        return this;
    }

    addColunaBooleanW(field: string, headerText: string, width: string): EstruturaGridViewBuilder {
        const coluna = new ColunaGridBoolean(field, headerText);
        coluna.setWidth(width);
        this.colunas.push(coluna);
        return this;
    }

    addColunaNumericaFormatada(field: string, headerText: any): EstruturaGridViewBuilder {
        this.colunas.push(new ColunaGridNumericaFormatada(field, headerText));
        return this;
    }

    addColunaNumericaFormatadaW(field: string, headerText: any, width: string): EstruturaGridViewBuilder {
        const coluna = new ColunaGridNumericaFormatada(field, headerText);
        coluna.setWidth(width);
        this.colunas.push(coluna);
        return this;
    }

    addColunaNumericaFormatadaWIcon(field: string, headerText: any, width: string, icon: any): EstruturaGridViewBuilder {
        const coluna = new ColunaGridNumericaFormatada(field, headerText);
        coluna.setWidth(width);
        coluna.setIcon(icon);
        this.colunas.push(coluna);
        return this;
    }

    addColunaNumericaFormatadaWAction(field: string, headerText: any, width: string, action: any): EstruturaGridViewBuilder {
        const coluna = new ColunaGridNumericaFormatada(field, headerText);
        coluna.setWidth(width);
        coluna.setAction(action);
        this.colunas.push(coluna);
        return this;
    }

    addColunaNumerica(field: string, headerText: any): EstruturaGridViewBuilder {
        this.colunas.push(new ColunaGridNumerica(field, headerText));
        return this;
    }

    addColunaNumericaW(field: string, headerText: string, width: string): EstruturaGridViewBuilder {
        const coluna = new ColunaGridNumerica(field, headerText);
        coluna.setWidth(width);
        this.colunas.push(coluna);
        return this;
    }

    addColunaNumericaWIcon(field: string, headerText: string, width: string, icon: any): EstruturaGridViewBuilder {
        const coluna = new ColunaGridNumerica(field, headerText);
        coluna.setWidth(width);
        coluna.setIcon(icon);
        this.colunas.push(coluna);
        return this;
    }

}
