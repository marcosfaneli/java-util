import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { IColunaGrid } from '../estrutura/IColunaGrid';

@Directive({
  selector: '[appColunaGrid]'
})
export class ColunaGridDirective implements OnInit {

  @Input() coluna: IColunaGrid;

  constructor(private elemento: ElementRef) {
  }

  ngOnInit() {
    this.definirAtributos();
  }

  private definirAtributos() {
    let atributos = {};
    let tagName: string = this.elemento.nativeElement.tagName;
    tagName = tagName.toUpperCase();
    if (tagName === 'TH') {
      atributos = this.coluna.getHeaderAtributes();
    } else {
      atributos = this.coluna.getCellAtributes();
    }
    for (const key in atributos) {
      if (atributos.hasOwnProperty(key)) {
        const element = atributos[key];
        this.elemento.nativeElement.setAttribute(key, element);
      }
    }
  }

}
