import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { URL_API } from '../../comum/constantes';
import { ServiceBase } from '../../comum/service-base/ServiceBase';

@Injectable()
export class RmpvDetalhadoFiltroService
extends ServiceBase {

  url: string;

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  protected getURL(): string {
    return this.url;
  }

  private definirURLFiltroMarca() {
    this.url = `${URL_API}/dash_filtro_marcas`;
  }

  public getFiltroMarcas(): Promise<any> {
    this.definirURLFiltroMarca();
    return this.get([]);
  }

  private definirURLFiltroTipos() {
    this.url = `${URL_API}/tipo_os`;
  }

  public getFiltroTipos(): Promise<any> {
    this.definirURLFiltroTipos();
    return this.get([]);
  }

  private definirURLFiltroDealers() {
    this.url = `${URL_API}/filtro/dealer`;
  }

  getFiltroDealers(): any {
    this.definirURLFiltroDealers();
    return this.get([]);
  }
}
