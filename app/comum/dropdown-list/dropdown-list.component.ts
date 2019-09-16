import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValuesAccessorBase } from '../custom-control/ValueAccesorBase';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './ListItem';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownListComponent,
    multi: true
  }]
})
export class DropdownListComponent
  extends ValuesAccessorBase<string>
  implements OnInit {

    @Input() label: string;
    @Input() obrigatorio: Boolean;
    @Input() name: string;
    @Input() itens: ListItem[];
    @Input() valorVazio = '0';
    @Output() selecionar: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {}

  seleciona() {
    this.selecionar.emit(this.value);
  }

}
