import { Injectable } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { URL_API } from '../../comum/constantes';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class RegionalService
extends ServiceCRUD {

  url = URL_API + '/regional';

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return this.url;
  }

  public salvar(obj: any): Promise<any> {
    const req: any = {};
    req.id = obj.id;
    req.id_usuario = +obj.usuario.id;
    req.id_regiao = +obj.regiao.id;

    return super.salvar(req);
  }
}
