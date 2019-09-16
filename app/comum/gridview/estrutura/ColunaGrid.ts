import { IColunaGrid } from './IColunaGrid';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';
import { ColunaGridComponent } from './coluna-grid/coluna-grid.component';

export class ColunaGrid
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

    getTitleAction() {
        this.action();
    }

    isAction(): boolean {
        return this.action
    }

    getHeaderText(): string {
        return this.headerText;
    }

    getHeaderAtributes(): {} {
        return {'scope': 'col', 'style': 'width: ' + this.getWidth() + ';'};
    }

    getCellAtributes(): {} {
        return {};
    }

    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid> {
        return pComponentFactoryResolver.resolveComponentFactory(ColunaGridComponent);
    }
}
