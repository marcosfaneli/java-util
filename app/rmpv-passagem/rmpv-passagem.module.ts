import { NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComumModule } from '../comum/comum.module';
import { BrowserModule } from '@angular/platform-browser';
import { RmpvPassagemListaComponent } from './rmpv-passagem-lista/rmpv-passagem-lista.component';
import { RmpvPassagemComponent } from './rmpv-passagem.component';
import { RmpvPassagemService } from './rmpv-passagem-service/rmpv-passagem.service';
import { RmpvPassagemFiltroComponent } from './rmpv-passagem-filtro/rmpv-passagem-filtro.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
      HttpModule,
      FormsModule,
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      ComumModule,
      ChartsModule,
      Ng2OdometerModule.forRoot(),
      NgbModule.forRoot()
  ],
  exports: [
    RmpvPassagemComponent
  ],
  declarations: [
    RmpvPassagemComponent,
    RmpvPassagemListaComponent,
    RmpvPassagemFiltroComponent,
  ],
  providers: [
    RmpvPassagemService,
  ]
})
export class RmpvPassagemModule { }
