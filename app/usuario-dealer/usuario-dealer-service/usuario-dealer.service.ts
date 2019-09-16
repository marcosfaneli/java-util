import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { URL_API } from '../../comum/constantes';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioDealerService
extends ServiceCRUD {

  url = URL_API + '/usuario_dealer';

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return this.url;
  }

}
