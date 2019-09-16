import { Injectable, Input } from '@angular/core';
import { ServiceCRUD } from '../../comum/crud/ServiceCRUD';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from '../../comum/constantes';


@Injectable()
export class RmpvMensalService extends ServiceCRUD {
  nome: string ;

  url = `${URL_API}/rmpv/${this.nome}/mensal`;

  constructor(http: Http, router: Router) {
    super(http, router)
  }

  setNomeServico(nome: any){
    this.nome = nome;
    console.log(this.nome);
  }

  protected getURL(): string {
    return `${URL_API}/rmpv/${this.nome}/mensal`;//this.url;
  }

}
