import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from './comum/constantes';
import { ServiceBase } from './comum/service-base/ServiceBase';

@Injectable()
export class AppService extends ServiceBase {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return `${URL_API}/menu`;
  }

  public getMenu(): Promise<any> {
    return this.get([]);
  }

}
