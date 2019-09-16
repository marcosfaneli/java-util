import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsComponent } from './os/os.component';
import { ComumModule } from '../comum/comum.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OsService } from './os-service/os.service';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ComumModule
  ],
  declarations: [
    OsComponent,
  ],
  exports: [
    OsComponent,
  ],
  providers : [
    OsService,
  ]
})
export class OsModule {
}
