import { Injectable } from '@angular/core';
import { ServiceBase } from '../../comum/service-base/ServiceBase';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { URL_API } from '../../comum/constantes';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComunicadoService extends ServiceBase {

  url: string;

  constructor(http: Http, router: Router) {
    super(http, router);
  }

  private setUrlDownload(chave, tipo: string): void {
   this.url = `${URL_API}/comunicado/download/${chave}/${tipo}`;
  }

  private setUrlComunicado(): void {
    this.url = `${URL_API}/comunicado`;
  }

  private setUrlEnviarComunicado(): void {
    this.url = `${URL_API}/comunicado/upload`;
  }

  private setUrlContatos(): void {
    this.url = `${URL_API}/usuario_fabrica`;
  }

  private setUrlMarcarNaoLido(id: number) {
    this.url = `${URL_API}/comunicado/unread/${id}`;
  }

  private setUrlObterPeloId(id: number) {
    this.url = `${URL_API}/comunicado/${id}`;
  }

  protected getURL(): string {
    return this.url;
  }

  public buscarContatos(): Promise<any> {
    this.setUrlContatos();

    return this.listar([], {});
  }

  public buscarComunicados(pagina: number): Promise<any> {
    this.setUrlComunicado();

    let filtros: any;
    filtros = {};
    filtros.paginacao = {};
    filtros.paginacao.pagina_atual = pagina;
    filtros.paginacao.quantidade_registros_por_pagina = 6;
    filtros.filtros = [];

    return this.listar([], filtros);
  }

  public marcarComoNaoLido(id: number): Promise<any> {
    this.setUrlMarcarNaoLido(id);
    return this.get([]);
  }

  public oberPeloId(id: number): Promise<any> {
    this.setUrlObterPeloId(id);
    return this.get([]);
  }

  public downloadDoArquivo(chave, tipo: string): Observable<any> {
    this.setUrlDownload(chave, tipo);
    return this.download([]);
  }

  public enviarArquivo(form: FormData): Promise<any> {
    this.setUrlEnviarComunicado();

    return this.postFormData([], form)
  }

}
