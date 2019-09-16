import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { URL_API } from '../constantes';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth-guard/auth.guard';

@Injectable()
export class BuscaCep {

    private token: string;

    private url: string = URL_API + '/cep/';

    constructor(private http: Http, public router: Router) {
        this.carregarToken();
    }

    private carregarToken() {
        try {
            this.token = new AuthGuard(this.router).getToken();
        } catch (Exception) {
            this.token = '';
        }
    }

    private getOptions(): RequestOptions {
        const headers = new Headers({ 'Authorization': this.token, 'Content-Type': 'application/json; charset=utf-8'});
        return new RequestOptions({ headers: headers });
    }

    public get(numeroCep: string): Promise<any> {
        const options = this.getOptions();
        let cep = {};

        return this.http.get(this.url.concat(numeroCep), options)
            .toPromise();
    }

}