import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComumModule } from '../comum/comum.module';

import { TipoOsComponent } from './tipo-os.component';
import { TipoOsService } from './tipo-os-service/tipo-os.service';
import { CategoriaOsService } from './tipo-os-service/categoria-os.service';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    ComumModule
  ],
  exports: [
    TipoOsComponent
  ],
  declarations: [
    TipoOsComponent
  ],
  providers: [
    TipoOsService,
    CategoriaOsService
  ]
})
export class TipoOsModule { }
