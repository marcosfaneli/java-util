import { Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { IColunaGrid } from '../estrutura/IColunaGrid';
import { IComponenteColunaGrid } from '../IComponenteColunaGrid';

@Directive({
  selector: '[appConteudoColunaGrid]'
})
export class ConteudoColunaGridDirective implements OnInit {

  @Input() coluna: IColunaGrid;
  @Input() registro: {};

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    const componentFactory = this.coluna.getCellData(this.componentFactoryResolver);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    let dados = '';
    for (const chave in this.registro) {
      if (this.coluna.getFieldName() === chave) {
        dados = this.registro[chave];
        break;
      }
    }
    (<IComponenteColunaGrid>componentRef.instance).Dados = dados;
  }

}
