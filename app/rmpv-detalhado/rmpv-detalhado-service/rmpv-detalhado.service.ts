import { Injectable } from '@angular/core';
import { URL_API } from '../../comum/constantes';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';

@Injectable()
export class RmpvDetalhadoService extends ServiceCRUD {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return `${URL_API}/rmpv/detalhado`;
  }
}

