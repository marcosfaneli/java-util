import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';

export interface IColunaGrid {
    getWidth(): string;
    getFieldName(): string;
    getHeaderText(): string;
    getHeaderAtributes(): {};
    getCellAtributes(): {};
    getIcon(): any;
    getCellData(pComponentFactoryResolver: ComponentFactoryResolver): ComponentFactory<IComponenteColunaGrid>;
    getTitleAction();
    isAction(): boolean;
}
