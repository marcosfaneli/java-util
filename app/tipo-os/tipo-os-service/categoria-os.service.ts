import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { URL_API } from '../../comum/constantes';
import { ServiceBase } from '../../comum/service-base/ServiceBase';
import { Parametro } from '../parametro';

@Injectable()
export class CategoriaOsService
  extends ServiceBase {

  private url = URL_API.concat('/categoria_os');

  constructor(
    http: Http,
    router: Router
  ) {
    super(http, router);
  }

  protected getURL(): string {
    return this.url;
  }

  private gerarListaParametros(categoria, tipo): any[] {
    const parametros: Parametro[] = [];

    const itemCategoria = new Parametro('categoria', categoria);
    parametros.push(itemCategoria);

    const itemTipo = new Parametro('tipo', tipo);
    parametros.push(itemTipo);

    console.log(parametros);

    return parametros;
  }

  incluirTipoCategoria(path: string, categoria: number, tipo: number): Promise<any> {
    const parametros = this.gerarListaParametros(categoria, tipo);
    return this.atualizar({}, parametros);
  }

  removerTipoCategoria(path: string, categoria: number, tipo: number): Promise<any> {
    const parametros = this.gerarListaParametros(categoria, tipo);
    return this.remover(parametros);
  }

}
