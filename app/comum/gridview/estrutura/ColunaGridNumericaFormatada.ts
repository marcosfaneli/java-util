import { IColunaGrid } from './IColunaGrid';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';
import { ColunaGridNumericaFormatadaComponent } from './coluna-grid-numerica-formatada/coluna-grid-numerica-formatada.component';

export class ColunaGridNumericaFormatada
implements IColunaGrid {

    private width: string;
    private value: any;
    private icon: any;
    private action: any;

    public constructor(
        private field: any,
        private headerText: any,
    ) {
        this.action = null;
    }

    setWidth(width: string) {
        this.width = width;
    }

    getWidth(): string {
        return this.width;
    }

    setIcon(icon: string) {
        this.icon = icon;
    }

    getIcon(): any {
        return this.icon;
    }

    setAction(action: any) {
        this.action = action;
    }

    getFieldName(): string {
        return this.field;
    }

    getHeaderText(): any {
        return this.headerText;
    }

    getvalue(): any {
        return this.value.toLocaleString('pt-br');
    }

    getTitleAction() {
        this.action();
    }

    isAction(): boolean {
        return this.action;
    }

    getHeaderAtributes(): {} {
        return {'scope': 'col', 'class': 'numerico', 'style': 'width: ' + this.getWidth() + ';'};
    }

    getCellAtributes(): {} {
        return {'class': 'numerico'};
    }

    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid> {
        return pComponentFactoryResolver.resolveComponentFactory(ColunaGridNumericaFormatadaComponent);
    }
}
