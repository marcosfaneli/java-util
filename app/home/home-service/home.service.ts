import { ServiceBase } from '../../comum/service-base/ServiceBase';
import { URL_API } from '../../comum/constantes';
import { Parametro } from '../../comum/service-base/parametro';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class HomeService
    extends ServiceBase {

    private url: string;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getURL(): string {
        return URL_API.concat('/').concat(this.url);
    }

    private definirURLFiltroMarca() {
        this.url = 'dash_filtro_marcas';
        // this.url = 'dash_filtro_marca';
    }

    private definirURLTotais() {
        this.url = 'dash_totais';
        // this.url = 'dash_total';
    }

    private definirURLAberturasOS() {
        this.url = 'aberturas_os';
        // this.url = 'abertura_os';
    }

    private definirURLFechamentosOS() {
        this.url = 'fechamentos_os';
        // this.url = 'fechamento_os';
    }

    private getParametrosData(dataInicial: string, dataFinal: string): Parametro[] {
        return [
            new Parametro('data_inicial', dataInicial),
            new Parametro('data_final', dataFinal)
        ];
    }

    public getFiltroMarcas(): Promise<any> {
        this.definirURLFiltroMarca();
        return this.get([]);
    }

    public getTotais(marcas: object): Promise<any> {
        this.definirURLTotais();
        // return this.get([]);
        return this.listar([], marcas);
    }

    public getAberturasOS(dataInicial: string, dataFinal: string, marcas: object): Promise<any> {
        this.definirURLAberturasOS();
        // return this.get([]);
        // return this.get(this.getParametrosData(dataInicial, dataFinal));
        return this.listar(this.getParametrosData(dataInicial, dataFinal), marcas);
    }

    public getFechamentosOS(dataInicial: string, dataFinal: string, marcas: object): Promise<any> {
        this.definirURLFechamentosOS();
        // return this.get([]);
        // return this.get(this.getParametrosData(dataInicial, dataFinal));
        return this.listar(this.getParametrosData(dataInicial, dataFinal), marcas);
    }

}
