import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { URL_API } from '../comum/constantes';

@Injectable()
export class AuthenticationService {

  private url: string;

  constructor(private http: Http) {
    this.url = URL_API.concat('/admin');
  }

  login(username: string, password: string): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    const body = '&username=' + username + '&password=' + password;

    return this.http.post(this.url, body, options).toPromise()
  }

}
