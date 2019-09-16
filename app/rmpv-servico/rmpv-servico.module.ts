import { RmpvMensalModule } from './../rmpv-mensal/rmpv-mensal.module';
import { NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComumModule } from '../comum/comum.module';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2OdometerModule } from 'ng2-odometer';
import { ChartsModule } from 'ng2-charts';
import { RmpvServicoListaComponent } from './rmpv-servico-lista/rmpv-servico-lista.component';
import { RmpvServicoComponent } from './rmpv-servico.component';
import { RmpvServicoService } from './rmpv-servico-service/rmpv-servico.service';
import { RmpvServicoFiltroComponent } from './rmpv-servico-filtro/rmpv-servico-filtro.component';

@NgModule({
  imports: [
      HttpModule,
      FormsModule,
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      ComumModule,
      ChartsModule,
      RmpvMensalModule,
      Ng2OdometerModule.forRoot(),
      NgbModule.forRoot()
  ],
  exports: [
    RmpvServicoComponent
  ],
  declarations: [
    RmpvServicoComponent,
    RmpvServicoListaComponent,
    RmpvServicoFiltroComponent,
  ],
  providers: [
    RmpvServicoService,
  ]
})
export class RmpvServicoModule { }
