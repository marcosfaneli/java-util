import { Component, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-text-box-busca',
  templateUrl: './text-box-busca.component.html',
  styleUrls: ['./text-box-busca.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextBoxBuscaComponent,
    multi: true
  }]
})
export class TextBoxBuscaComponent extends TextBoxComponent {

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  buscarTextBox() {
    this.buscar.emit(null);
  }

}
