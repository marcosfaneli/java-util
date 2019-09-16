import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { URL_API } from '../../comum/constantes';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class ProdutividadeService extends ServiceCRUD {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

   url = URL_API + '/produtividade';

  protected getURL(): any {
    return this.url;
  }

}
