import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownListComponent } from './dropdown-list.component';
import { ListitemBuilder } from './ListItemBuilder';
import { FiltroService } from '../filtro/filtro.service';

@Component({
  selector: 'app-dropdown-list-api',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownListApiComponent,
    multi: true
  }]
})
export class DropdownListApiComponent
  extends DropdownListComponent
  implements OnInit {

  @Input() filtro: string;

  constructor(private service: FiltroService) {
    super();
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    const url = this.filtro;

    this.itens = [];
    const builder = new ListitemBuilder();
    this.service.buscar(url)
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itens = builder.build();
      });
  }

}
