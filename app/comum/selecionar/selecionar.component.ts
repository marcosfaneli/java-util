import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JanelaComponent } from '../janela/janela.component';

@Component({
  selector: 'app-selecionar',
  templateUrl: './selecionar.component.html',
  styleUrls: ['./selecionar.component.css']
})
export class SelecionarComponent extends JanelaComponent implements OnInit {

  @Input() lista = [];
  @Output() escolhido: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  escolher(objeto: any) {
    this.escolhido.emit(objeto);
  }

}
