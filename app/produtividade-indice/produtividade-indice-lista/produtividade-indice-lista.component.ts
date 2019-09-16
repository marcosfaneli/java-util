import { Component, OnInit } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProdutividadeIndiceService} from '../produtividade-indice-service/produtividade-indice.service';

@Component({
    selector: 'app-produtividade-indice-lista',
    templateUrl: '../../template/lista.html',
    styleUrls: ['./produtividade-indice-lista.component.css']
  })
export class ProdutividadeIndiceListaComponent extends ListaBase implements OnInit {

    visualizarTotalRegistros: boolean;
    exibirBotaoDetalhes: boolean;

    constructor(service: ProdutividadeIndiceService, toastr: ToastrService, router: Router) {
        super(service, toastr, router);

        this.visualizarTotalRegistros = true;
        this.exibirBotaoDetalhes = true;
        this.exibirBotaoNovo = false;
        this.exibirBotaoDefinirFiltros = false;
    }

    ngOnInit() {
        this.buscar();

        this.estrutura = new EstruturaGridViewBuilder()
            .addColunaCentralizadaW('id', 'ID', '50px')
            .addColuna('fabrica', 'Fábrica')
            .addColunaCentralizada('maoDeObra', 'Mão de Obra')
            .addColunaCentralizada('produtividade', 'Produtividade')
            .addColunaCentralizada('eficiencia', 'Eficiência')
            .build();
    }

    protected getListagemComFiltros(): boolean {
        return false;
    }

}