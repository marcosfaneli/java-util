import { AuthGuard } from './../../auth-guard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { transition } from '@angular/core/src/animation/dsl';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-barra-notificacao',
  templateUrl: './barra-notificacao.component.html',
  styleUrls: ['./barra-notificacao.component.css']
})
export class BarraNotificacaoComponent implements OnInit {
  quant_new_not = 1;
  mostra_not = false;
  total_registros;

  constructor(private router: Router ) {

  }

  ngOnInit() {
  }

  calcula_notificacao() {
    if (this.quant_new_not > 0) {
      this.mostra_not = true;
    }
  }

}
