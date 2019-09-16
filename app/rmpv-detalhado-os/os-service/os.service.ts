import { Injectable } from '@angular/core';
import { ServiceBase } from '../../comum/service-base/ServiceBase';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from '../../comum/constantes';

@Injectable()
export class OsService extends ServiceBase {

  url: string;

  public setUrl(numero: string) {
    this.url = `${URL_API}/os/${numero}`;
  }

  protected getURL(): string {
    return this.url;
  }

  constructor(http: Http, router: Router) {
    super(http, router);
  }

}
