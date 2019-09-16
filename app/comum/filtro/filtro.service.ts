import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_API } from '../constantes';
import { ServiceBase } from '../service-base/ServiceBase';
import { Router } from '@angular/router';

@Injectable()
export class FiltroService
extends ServiceBase {

  constructor(
    http: Http,
    router: Router
  ) {
    super(http, router);
  }

  url = URL_API + '/filtro/';
  filtro = '';

  protected getURL(): string {
    return this.url + this.filtro;
  }

  public buscar(filtro: string): Promise<any> {
    this.filtro = filtro;
    return this.get([]);
  }

}
