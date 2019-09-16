import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { URL_API } from '../../comum/constantes';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable( )

export class BarraNotificacaoService extends ServiceCRUD  {

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  url = URL_API + '/notificacao';

   protected getURL(): string {
    return this.url;
  }


}

