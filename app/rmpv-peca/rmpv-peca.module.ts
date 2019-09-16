import { NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComumModule } from '../comum/comum.module';
import { BrowserModule } from '@angular/platform-browser';
import { RmpvPecaListaComponent } from './rmpv-peca-lista/rmpv-peca-lista.component';
import { RmpvPecaComponent } from './rmpv-peca.component';
import { RmpvPecaService } from './rmpv-peca-service/rmpv-peca.service';
import { RmpvPecaFiltroComponent } from './rmpv-peca-filtro/rmpv-peca-filtro.component';
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
    RmpvPecaComponent
  ],
  declarations: [
    RmpvPecaComponent,
    RmpvPecaListaComponent,
    RmpvPecaFiltroComponent,
  ],
  providers: [
    RmpvPecaService,
  ]
})
export class RmpvPecaModule { }
