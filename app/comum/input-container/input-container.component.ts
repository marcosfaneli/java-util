import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent
  implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() obrigatorio: Boolean;
  @Input() errorMessage = 'Campo Obrigatório!';
  @Input() errorMessagePreenchido: string;
  @Input() valorVazio = '';

  input: any;

  @ContentChild(NgModel) model: NgModel;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model;
    if (this.input === undefined) {
      throw new Error('Esse conponente precisa ser usado com uma diretiva ngModel');
    }
  }

  hasError(): boolean {
    let valido: Boolean = true;
    if (this.obrigatorio) {
      valido = this.input.value;
    }
    return !valido && (this.input.dirty || this.input.touched);
  }

  messagemErro(): string {
    let retorno: string = this.errorMessage;

    if (this.errorMessagePreenchido) {
      if (this.input.value) {
        retorno = this.errorMessagePreenchido;
      }
    }

    return retorno;
  }

}
