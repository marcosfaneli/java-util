import { ExportExcelService } from './excel-service/export-excel.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { FiltroService } from './filtro/filtro.service';
import { BuscaCep } from './cep/busca-cep';
import { FiltroComponent } from './filtro/filtro.component';
import { FiltroDataComponent } from './filtro-data/filtro-data.component';
import { ErroMessageComponent } from './erro-message/erro-message.component';
import { NumeroFloatComponent } from './numero-float/numero-float.component';
import { BarraConsultaComponent } from './barra-consulta/barra-consulta.component';
import { BarraCrudComponent } from './barra-crud/barra-crud.component';
import { GridviewComponent } from './gridview/gridview.component';
import { ColunaGridDirective } from './gridview/diretiva/coluna-grid.directive';
import { ConteudoColunaGridDirective } from './gridview/diretiva/conteudo-coluna-grid.directive';
import { ColunaGridComponent } from './gridview/estrutura/coluna-grid/coluna-grid.component';
import { ColunaGridBooleanComponent } from './gridview/estrutura/coluna-grid-boolean/coluna-grid-boolean.component';
import { ColunaGridNumericaComponent } from './gridview/estrutura/coluna-grid-numerica/coluna-grid-numerica.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { TextBoxBuscaComponent } from './text-box-busca/text-box-busca.component';
import { LoadingComponent } from './loading/loading.component';
import { TextBoxPasswordComponent } from './text-box-password/text-box-password.component';
import { DropdownListApiComponent } from './dropdown-list/dropdown-list-api.component';
import { NgxMaskModule } from 'ngx-mask';
import { DashBoard } from './dashboard';
import { TextBoxDataComponent } from './text-box-data/text-box-data.component';
import { JanelaComponent } from './janela/janela.component';
import { SelecionarComponent } from './selecionar/selecionar.component';
import { ColunaCentralizadaComponent } from './gridview/estrutura/coluna-centralizada/coluna-centralizada.component';
import { TextBoxDataService } from './text-box-data/text-box-data.service';

// tslint:disable-next-line:max-line-length
import { ColunaGridNumericaFormatadaComponent } from './gridview/estrutura/coluna-grid-numerica-formatada/coluna-grid-numerica-formatada.component';
import { TextBoxNoContainerComponent } from './text-box-no-container/text-box-no-container.component';
import { BarraConsultaMensalComponent } from './barra-consulta-mensal/barra-consulta-mensal.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    NgbModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    FiltroComponent,
    FiltroDataComponent,
    NumeroFloatComponent,
    ErroMessageComponent,
    BarraConsultaComponent,
    BarraConsultaMensalComponent,
    BarraCrudComponent,
    GridviewComponent,
    TextBoxComponent,
    CheckBoxComponent,
    DropdownListComponent,
    DropdownListApiComponent,
    TextBoxBuscaComponent,
    TextBoxPasswordComponent,
    TextBoxNoContainerComponent,
    TextBoxDataComponent,
    LoadingComponent,
    SelecionarComponent
  ],
  declarations: [
    FiltroComponent,
    FiltroDataComponent,
    ErroMessageComponent,
    NumeroFloatComponent,
    BarraConsultaComponent,
    BarraCrudComponent,
    GridviewComponent,
    ColunaGridDirective,
    ConteudoColunaGridDirective,
    ColunaGridComponent,
    ColunaGridBooleanComponent,
    ColunaGridNumericaComponent,
    ColunaGridNumericaFormatadaComponent,
    TextBoxComponent,
    CheckBoxComponent,
    InputContainerComponent,
    DropdownListComponent,
    DropdownListApiComponent,
    TextBoxBuscaComponent,
    TextBoxPasswordComponent,
    LoadingComponent,
    TextBoxDataComponent,
    JanelaComponent,
    SelecionarComponent,
    ColunaCentralizadaComponent,
    TextBoxNoContainerComponent,
    BarraConsultaMensalComponent,
  ],
  entryComponents: [
    ColunaGridComponent,
    ColunaGridBooleanComponent,
    ColunaGridNumericaComponent,
    ColunaGridNumericaFormatadaComponent,
    ColunaCentralizadaComponent
  ],
  providers: [
   { provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: NgbDateParserFormatter, useClass: TextBoxDataService},
    FiltroService,
    DashBoard,
    BuscaCep,
    ExportExcelService,
  ]
})
export class ComumModule { }
