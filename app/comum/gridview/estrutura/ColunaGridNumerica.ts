import { IColunaGrid } from './IColunaGrid';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';
import { ColunaGridNumericaComponent } from './coluna-grid-numerica/coluna-grid-numerica.component';

export class ColunaGridNumerica
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

    getFieldName(): string {
        return this.field;
    }

    getHeaderText(): any {
        return this.headerText;
    }

    getvalue(): any {
        return this.value;
    }

    getTitleAction() {
        this.action();
    }

    isAction(): boolean {
        return this.action
    }

    getHeaderAtributes(): {} {
        return {'scope': 'col', 'class': 'numerico', 'style': 'width: ' + this.getWidth() + ';'};
    }

    getCellAtributes(): {} {
        return {'class': 'numerico'};
    }

    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid> {
        return pComponentFactoryResolver.resolveComponentFactory(ColunaGridNumericaComponent);
    }
}
