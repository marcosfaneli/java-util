import { NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComumModule } from '../comum/comum.module';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2OdometerModule } from 'ng2-odometer';
import { ChartsModule } from 'ng2-charts';
import { RmpvDetalhadoListaComponent } from '../rmpv-detalhado/rmpv-detalhado-lista/rmpv-detalhado-lista.component';
import { RmpvDetalhadoComponent } from '../rmpv-detalhado/rmpv-detalhado.component';
import { RmpvDetalhadoService } from '../rmpv-detalhado/rmpv-detalhado-service/rmpv-detalhado.service';
import { RmpvDetalhadoFiltroComponent } from './rmpv-detalhado-filtro/rmpv-detalhado-filtro.component';
import { RmpvDetalhadoFiltroService } from './rmpv-detalhado-filtro/rmpv-detalhado-filtro.service';
import { OsModule } from '../rmpv-detalhado-os/os.module';

@NgModule({
  imports: [
      HttpModule,
      FormsModule,
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      ComumModule,
      ChartsModule,
      OsModule,
      Ng2OdometerModule.forRoot(),
      NgbModule.forRoot()
  ],
  exports: [
    RmpvDetalhadoComponent
  ],
  declarations: [
    RmpvDetalhadoComponent,
    RmpvDetalhadoListaComponent,
    RmpvDetalhadoFiltroComponent,
    RmpvDetalhadoComponent,
  ],
  providers: [
    RmpvDetalhadoService,
    RmpvDetalhadoFiltroService,
  ]
})
export class RmpvDetalhadoModule { }
