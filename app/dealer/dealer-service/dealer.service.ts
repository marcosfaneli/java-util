import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from '../../comum/constantes';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';


@Injectable()
export class DealerService
  extends ServiceCRUD {

  url = URL_API + '/dealer';

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return this.url;
  }

}
