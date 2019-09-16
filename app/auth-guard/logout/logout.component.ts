import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
  <div class="conteudo">
    <h1 style="
          position: fixed;
          left:50%;
          top: 50%;
          height: 200px;
          width:300px;
          padding:50px;
          font-size: 20px;
          text-align: center;
          box-shadow: 0 0 3px rgba(0,0,0,.2);
          margin-left: -150px;
          margin-top: -120px;
    ">Desconectando...</h1>
    <app-loading [exibir]="true"></app-loading>
  </div>`
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    setTimeout(() => {
      try {
        sessionStorage.removeItem('currentUser');

        this.router.navigateByUrl('/admin');
      } catch (Exception) {
        this.router.navigateByUrl('/admin');
      }
    }, 1000);
  }

}
