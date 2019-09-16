import { Component, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './auth-guard/auth.guard';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  notificacao = true;
  logado = false;

  resolucaoTelaGrafico = screen.availWidth;

  redimensionou: boolean;
  menu: boolean;
  resolucao: boolean;
  itensMenu = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private service: AppService,
    private auth: AuthGuard) { }

  ngOnInit() {
    if (this.resolucaoTelaGrafico > 1001) {
      this.menu = true;
      this.redimensionou = true;
      this.resolucao = true;
    } else {
      this.menu = false;
      this.redimensionou = false;
      this.resolucao = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resolucaoTelaGrafico = event.target.innerWidth;
    if (this.resolucaoTelaGrafico > 1001) {
      this.redimensionou = true;
      this.alterouResolucao(this.redimensionou);
    } else {
      this.redimensionou = false;
      this.alterouResolucao(this.redimensionou);
    }
  }

  alterouResolucao(valor: boolean): void {
    if (this.resolucao) {
      this.menu = !this.menu;
    }
  }

  private getUser(): string {
    return this.auth.getUsername();
  }

  get tratarLogado(): boolean {
    const logado = this.auth.getLogado();

    if (logado !== this.logado) {
      this.logado = logado;
      this.cdRef.detectChanges();

      this.service.getMenu()
        .then(res => this.itensMenu = res.menu)
        .catch(erro => console.error(erro));
    }

    return this.logado;
  }

  desativaMenu() {
    if (this.menu === true) {
      $('#sidebar').toggleClass('active');
      this.menu = false;
    }
  }

  toogleMenu() {
    $('#sidebar').toggleClass('active');
    this.menu = !this.menu;
  }

  desativaNotificacao() {
    if (this.notificacao === false) {
      $('#notificacao').toggleClass('active');
    }
  }

  toogleNotificacao() {
    $('#notificacao').toggleClass('active');
  }

}
