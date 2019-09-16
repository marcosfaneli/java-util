import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthGuard } from '../../auth-guard/auth.guard';
import { Parametro } from './parametro';

export abstract class ServiceBase {

    private auth;

    constructor(private http: Http, public router: Router) {
        this.auth = new AuthGuard(this.router);
    }

    protected abstract getURL(): string;

    protected getToken(): string {
        try {
            return this.auth.getToken();
        } catch (Exception) {
            return '';
        }
    }

    private getOptions(): RequestOptions {
        const headers = new Headers({ 'Authorization': this.getToken(), 'Content-Type': 'application/json; charset=utf-8'});
        return new RequestOptions({ headers: headers });
    }

    private gerarParametros(parametros: Parametro[]): string {
        let retorno = '';
        parametros.forEach(parametro => {
            retorno = retorno.concat('/').concat(parametro.valor);
        });

        return retorno;
    }

    public incluir(obj: {}, parametros: Parametro[]): Promise<any> {
        const options = this.getOptions();
        const params = this.gerarParametros(parametros);

        return this.http.put(this.getURL().concat(params), obj, options)
            .toPromise()
            .then(this.tratarRetorno);
    }

    public atualizar(obj: any, parametros: Parametro[]): Promise<any> {
        const options = this.getOptions();
        const params = this.gerarParametros(parametros);

        const url = obj.id ? this.getURL().concat('/').concat(obj.id).concat(params) : this.getURL().concat(params);

        return this.http.put(url, obj, options)
            .toPromise()
            .then(this.tratarRetorno);
    }

    public remover(parametros: Parametro[]): Promise<any> {
        const options = this.getOptions();
        const params = this.gerarParametros(parametros);

        return this.http.delete(this.getURL().concat(params), options)
            .toPromise()
            .then(this.tratarRetorno);
    }

    public listar(parametros: Parametro[], filtros: object): Promise<any> {
        const options = this.getOptions();
        const params = this.gerarParametros(parametros);

        return this.http.post(this.getURL().concat(params), filtros, options)
            .toPromise()
            .then(this.tratarRetorno);
    }

    public get(parametros: Parametro[]): Promise<any> {
        const options = this.getOptions();
        const params = this.gerarParametros(parametros);

        return this.http.get(this.getURL().concat(params), options)
            .toPromise()
            .then(this.tratarRetorno);
    }

    public download(parametros: Parametro[]): Observable<any> {
        const headers = new Headers({ 'Authorization': this.getToken() });
        const options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

        const params = this.gerarParametros(parametros);

        const url = this.getURL().concat(params);

        return this.http.get(url, options);
    }

    public postFormData(parametros: Parametro[], form: FormData): Promise<any> {
        const headers = new Headers({ 'Authorization': this.getToken(), 'Accept': 'application/json' });
        const options = new RequestOptions({ headers: headers});

        const params = this.gerarParametros(parametros);

        const url = this.getURL().concat(params);

        return this.http.post(url, form, options).toPromise();
    }

    protected tratarRetorno(res: any) {
        try {
            return res.json();
        } catch (Exception) {
            return { 'Success': true }
        }
    }
}
