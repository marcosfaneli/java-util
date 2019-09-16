import { Output, EventEmitter, Input } from '@angular/core';
import { Estado } from '../shared/estado.enum';
import { ServiceCRUD } from './ServiceCRUD';
import { ToastrService } from 'ngx-toastr';

export abstract class CrudBase {

    @Output() buscar = new EventEmitter();
    @Input() model: any = {};
    @Input() state: Estado = Estado.view;

    exibirNovo: Boolean = true;
    exibirExcluir: Boolean = true;

    constructor(protected service: ServiceCRUD,protected toastr: ToastrService) {
        
    }

    protected salvar() {
        this.service.salvar(this.model)
            .then(
                res => {
                    if (res) {
                        this.mensagemSucesso();
                        this.busca();
                    } else {
                        this.tratarErro('Não é possível salvar o registro!', 'Problema', res);
                    }
                },
                error => {
                    this.tratarErro('Não é possível salvar o registro!', 'Problema', <any>error);
                });
    }

    protected mensagemSucesso() {
        this.toastr.success('Registro salvo com sucesso!', 'Salvar Registro');
    }

    novo() {
        this.state = Estado.insert;
        this.model = {};
    }

    busca() {
        this.buscar.emit(null);
    }

    editar() {
        this.state = Estado.edit;
    }

    excluir() {
        this.service.excluir(this.model.id)
            .then(res => {
                if (res) {
                    this.toastr.success('Registro excluído com sucesso!', 'Excluir Registro');
                    this.busca();
                } else {
                    this.tratarErro('Não é possível excluir o registro!', 'Problema', <any>res);
                }
            },
                error => {
                    this.tratarErro('Não é possível excluir o registro!', 'Problema', <any>error);
                });
    }

    cancelar() {
        if (this.state === Estado.insert) {
            this.state = Estado.view;
            this.busca();
        } else {
            this.state = Estado.view;
        }
    }

    tratarErro(mensagem: string, titulo: string, error: any) {
        let texto;
        try {
            texto = error.json().erro ? mensagem + '\n' + error.json().erro : mensagem;
        } catch (Exception) {
            texto = mensagem;
        }

        this.toastr.error(texto, titulo, <any>error);

        if (error.status === 401) {
            this.service.router.navigateByUrl('logout');
        }
        return Promise.reject(error);
    }

}
