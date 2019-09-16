import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { ProdutividadeIndiceService } from '../produtividade-indice-service/produtividade-indice.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';

@Component({
    selector: 'app-produtividade-indice-cadastro',
    templateUrl: './produtividade-indice-cadastro.component.html',
    styleUrls: ['./produtividade-indice-cadastro.component.css']
})
export class ProdutividadeIndiceCadastroComponent extends CrudBase implements OnInit {

    constructor(service: ProdutividadeIndiceService, toastr: ToastrService) {
        super(service, toastr);

        this.exibirExcluir = false;
        this.exibirNovo = false;
    }

    ngOnInit() {

    }

}