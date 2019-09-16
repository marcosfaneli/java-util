import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { ProdutividadeIndiceComponent } from './produtividade-indice.component';
import { ProdutividadeIndiceListaComponent } from './produtividade-indice-lista/produtividade-indice-lista.component';
import { ProdutividadeIndiceService } from './produtividade-indice-service/produtividade-indice.service';
import { ProdutividadeIndiceCadastroComponent } from './produtividade-indice-cadastro/produtividade-indice-cadastro.component';

@NgModule({
    imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ComumModule
    ],
    exports: [
        ProdutividadeIndiceComponent
    ],
    declarations: [
        ProdutividadeIndiceComponent,
        ProdutividadeIndiceListaComponent,
        ProdutividadeIndiceCadastroComponent
    ],
    providers: [
        ProdutividadeIndiceService
    ]
})
export class ProdutividadeIndiceModule {

}
