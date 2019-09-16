import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { ComumModule } from '../comum/comum.module';
import { ComunicadoComponent } from './comunicado.component';
import { ComunicadoService } from './service/comunicado.service';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { ExibirComponent } from './exibir/exibir.component';


@NgModule({
  declarations: [
    ComunicadoComponent,
    ListaComponent,
    NovoComponent,
    ExibirComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    ComumModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ComunicadoService
  ],
  bootstrap: [
    ComunicadoComponent
  ]
})
export class ComunicadoModule { }
