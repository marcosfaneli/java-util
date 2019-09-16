import { IColunaGrid } from './IColunaGrid';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';
import { ColunaCentralizadaComponent } from './coluna-centralizada/coluna-centralizada.component';

export class ColunaGridCentralizada
    implements IColunaGrid {

    private width: string;
    private icon: any;
    private action: any;

    public constructor(
        private field: string,
        private headerText: string,
    ) {
        this.action = null;
    }

    setWidth(width: string) {
        this.width = width;
    }

    getWidth(): string {
        return this.width;
    }

    getIcon(): any {
        return this.icon;
    }

    getFieldName(): string {
        return this.field;
    }

    getHeaderText(): string {
        return this.headerText;
    }

    getTitleAction() {
        this.action();
    }

    isAction(): boolean {
        return this.action
    }

    getHeaderAtributes(): {} {
        return {'scope': 'col', 'style': 'width: ' + this.getWidth() + '; text-align: center;'};
    }

    getCellAtributes(): {} {
        return {};
    }

    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid> {
        return pComponentFactoryResolver.resolveComponentFactory(ColunaCentralizadaComponent);
    }
}
