import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComumModule } from '../comum/comum.module';
import { QuartilComponent } from './quartil.component';
import { QuartilListaComponent } from './quartil-lista/quartil-lista.component';
import { QuartilCadastroComponent } from './quartil-cadastro/quartil-cadastro.component';
import { QuartilService } from './quartil-service/quartil.service';
import { QuartilFiltroComponent } from './quartil-filtro/quartil-filtro.component';

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
    QuartilComponent
  ],
  declarations: [
    QuartilComponent,
    QuartilListaComponent,
    QuartilCadastroComponent,
    QuartilFiltroComponent
  ],
  providers: [
    QuartilService
  ]
})
export class QuartilModule { }
