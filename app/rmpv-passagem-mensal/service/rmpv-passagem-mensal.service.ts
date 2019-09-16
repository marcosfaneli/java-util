import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from '../../comum/constantes';

@Injectable()
export class RmpvPassagemMensalService extends ServiceCRUD {

  url = `${URL_API}/rmpv/passagem/mensal`;

  constructor(http: Http, router: Router) {
    super(http, router)
  }

  protected getURL(): string {
    return this.url;
  }

}
