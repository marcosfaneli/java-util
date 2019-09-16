import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth-guard/auth.guard';
import { NOME_MARCA } from '../../comum/constantes';

@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    private model: any = {};
    private loading = false;
    private error = '';
    fundoImg = 'conteudo ' + NOME_MARCA;

    constructor(
        private router: Router,
        private service: AuthenticationService
    ) { }

    ngOnInit() {
        const auth = new AuthGuard(this.router);
        if (auth.getLogado()) {
            this.router.navigateByUrl('/');
        }
    }

    logon() {
        this.loading = true;
        this.error = '';

        this.service
            .login(this.model.username, this.model.password)
            .then(response => this.tratarLoginSucesso(response, this.model.username))
            .catch(erro => this.tratarLoginErro(erro));
    }

    tratarLoginSucesso(response, username: string) {
        this.loading = false;

        sessionStorage.clear();

        if (response.status === 200) {
            const retorno = response.json();

            console.log(retorno);

            sessionStorage.removeItem('currentUser');
            sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: retorno.Authentication }));

            this.router.navigateByUrl('/');

            return;
        }

        this.tratarLoginErro(response);
    }

    tratarLoginErro(erro) {
        this.loading = false;

        this.error = erro.errorCode === 403 ? 'Usuário ou senha incorreto' : 'Por favor, tente mais tarde ';

    }
}
