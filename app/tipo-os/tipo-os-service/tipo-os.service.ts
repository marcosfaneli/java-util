import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { URL_API } from '../../comum/constantes';
import { ServiceBase } from '../../comum/service-base/ServiceBase';

@Injectable()
export class TipoOsService
extends ServiceBase {

  constructor (
    http: Http,
    router: Router
  ) {
    super(http, router);
  }

  url = '';

  protected getURL(): string {
    return this.url;
  }

  private definirURLTipoOs() {
    this.url = `${URL_API}/tipo_os`;
  }

  public getFiltroTipoOs(): Promise<any> {
    this.definirURLTipoOs();
    return this.get([]);
  }

  private definirURLFiltroMarca() {
    this.url = `${URL_API}/dash_filtro_marcas`;
  }

  public getFiltroMarcas(): Promise<any> {
    this.definirURLFiltroMarca();
    return this.get([]);
  }
}
