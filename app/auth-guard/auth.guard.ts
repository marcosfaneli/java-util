import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    public getToken(): string {
        try {
            const item = JSON.parse(sessionStorage.getItem('currentUser'));
            return item['token'];
        } catch (Exception) {
            return '';
        }
    }

    public getDealerCode(): string {
        try {
            const item = JSON.parse(sessionStorage.getItem('currentUser'));
            return item['dealer'];
        } catch (Exception) {
            return '';
        }
    }

    public getUsername(): string {
        try {
            const item = JSON.parse(sessionStorage.getItem('currentUser'));
            return item['username'];
        } catch (Exception) {
            return '';
        }
    }

    getLogado(): boolean {
        const token = this.getToken();
        return token !== '' && token !== null;
    }

    canActivate() {
        if (sessionStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['login']);
    }

}
