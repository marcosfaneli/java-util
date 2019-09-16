import { IColunaGrid } from './IColunaGrid';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { ColunaGridBooleanComponent } from './coluna-grid-boolean/coluna-grid-boolean.component';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';

export class ColunaGridBoolean implements IColunaGrid {

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

    getTitleAction() {
        this.action();
    }

    isAction(): boolean {
        return this.action
    }

    getFieldName(): string {
        return this.field;
    }

    getHeaderText(): string {
        return this.headerText;
    }

    getHeaderAtributes(): {} {
        return {'scope': 'col', 'class': 'boolean', 'style': 'width: ' + this.getWidth() + ';'};
    }

    getCellAtributes(): {} {
        return {'class': 'boolean'};
    }

    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid> {
        return pComponentFactoryResolver.resolveComponentFactory(ColunaGridBooleanComponent);
    }

}
