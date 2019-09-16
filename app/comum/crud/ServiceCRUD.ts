import { Injectable } from '@angular/core';

import { ServiceBase } from '../service-base/ServiceBase';
import { Parametro } from '../service-base/parametro';
import { AuthGuard } from '../../auth-guard/auth.guard';

@Injectable()
export abstract class ServiceCRUD
extends ServiceBase {

    public salvar(obj: any): Promise<any> {
        if (obj.id) {
            return this.atualizar(obj, []);
        } else {
            obj.id = 0;
            return this.incluir(obj, []);
        }
    }

    public excluir(id: number): Promise<any> {
        const parametros: Parametro[] = [];
        parametros.push(new Parametro('id', id.toString()));
        return this.remover(parametros);
    }

    public buscar(filtros: object): Promise<any> {
        return this.listar([], filtros);
    }

    getDealerCode(): string {
        return new AuthGuard(this.router).getToken();
    }
}
