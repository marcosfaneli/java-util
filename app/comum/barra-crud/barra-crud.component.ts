import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Estado } from '../shared/estado.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barra-crud',
  templateUrl: './barra-crud.component.html',
  styleUrls: ['./barra-crud.component.css']
})

export class BarraCrudComponent implements OnInit {

  private _state: Estado;
  private _exibirMensagem: Boolean = false;

  @Output() inserindo = new EventEmitter();
  @Output() editando = new EventEmitter();
  @Output() salvando = new EventEmitter();
  @Output() excluindo = new EventEmitter();
  @Output() cancelando = new EventEmitter();
  @Output() voltando = new EventEmitter();
  @Input() formValido: Boolean = false;

  @Input() exibirNovo: Boolean = true;
  @Input() exibirExcluir: Boolean = true;

  modoEdicao: Boolean = true;

  constructor(
    private toastr: ToastrService
  ) {
    this._state = Estado.view;
  }

  ngOnInit() {
  }

  @Input('state')
  get state(): Estado {
    return this._state;
  }

  set state(value: Estado) {
    this._state = value;
    this.modoEdicao = this._state !== Estado.view;
  }

  inserir() {
    this.inserindo.emit(null);
  }

  editar() {
    this.editando.emit(null);
  }

  salvar() {
    if (this.formValido) {
      this.salvando.emit(null);
    } else {
      this.toastr.warning('Preencha todos os campos obrigatórios!', 'Validação');
    }
  }

  excluir() {
    this.excluindo.emit(null);
  }

  cancelar() {
    this.cancelando.emit(null);
  }

  voltar() {
    this.voltando.emit(null);
  }

}
