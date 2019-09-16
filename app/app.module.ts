import { BarraNotificacaoModule } from './comum/barra-notificacao/barra-notificacao.module';
import { BarraNotificacaoComponent } from './comum/barra-notificacao/barra-notificacao.component';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BreadcrumbsModule } from 'ng2-breadcrumbs';
import { HttpClientModule } from '@angular/common/Http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { DealerModule } from './dealer/dealer.module';
import { HomeModule } from './home/home.module';
import { TipoOsModule } from './tipo-os/tipo-os.module';
import { ComumModule } from './comum/comum.module';
import { RmpvServicoModule } from './rmpv-servico/rmpv-servico.module';
import { RmpvDetalhadoModule } from './rmpv-detalhado/rmpv-detalhado.module';
import { RmpvPecaModule } from './rmpv-peca/rmpv-peca.module';
import { RmpvPassagemModule } from './rmpv-passagem/rmpv-passagem.module';
import { ToastrModule } from 'ngx-toastr';
import { TipoDealerModule } from './tipo-dealer/tipo-dealer.module';
import { GrupoImportadorModule } from './grupo-importador/grupo-importador.module';
import { GrupoEconomicoModule } from './grupo-economico/grupo-economico.module';
import { ProdutividadeModule } from './produtividade/produtividade.module';
import { QuartilModule } from './quartil/quartil.module';
import { FuncaoModule } from './funcao/funcao.module';
import { UsuarioDealerModule } from './usuario-dealer/usuario-dealer.module';
import { UsuarioFabricaModule } from './usuario-fabrica/usuario-fabrica.module';
import { RegionalModule } from './regional/regional.module';
import { OsModule } from './rmpv-detalhado-os/os.module';
import { AuthenticationService } from './auth-guard/authentication.service';
import { AuthGuard } from './auth-guard/auth.guard';
import { LogoutComponent } from './auth-guard/logout/logout.component';
import { AdminComponent } from './auth-guard/admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppDirective } from './app.directive';
import { RmpvMensalModule } from './rmpv-mensal/rmpv-mensal.module';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { RmpvDetalheProdutivoModule } from '../app/rmpv-detalhe-produtivo/rmpv-detalhe-produtivo.module';
import { RmpvPassagemMensalModule } from './rmpv-passagem-mensal/rmpv-passagem-mensal.module';
import { RmpvPecaMensalModule } from './rmpv-peca-mensal/rmpv-peca-mensal.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { ProdutividadeIndiceModule } from './produtividade-indice/produtividade-indice.module';
import { AppService } from './app.service';

registerLocaleData(ptBr)

@NgModule({
  imports: [
    BreadcrumbsModule,
    ComumModule,
    BarraNotificacaoModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DealerModule,
    TipoDealerModule,
    GrupoImportadorModule,
    GrupoEconomicoModule,
    FuncaoModule,
    QuartilModule,
    ProdutividadeModule,
    HomeModule,
    HttpClientModule,
    TipoOsModule,
    UsuarioDealerModule,
    UsuarioFabricaModule,
    RegionalModule,
    RmpvServicoModule,
    RmpvMensalModule,
    RmpvDetalhadoModule,
    RmpvPassagemModule,
    RmpvPassagemMensalModule,
    RmpvPecaModule,
    RmpvPecaMensalModule,
    BrowserAnimationsModule,
    OsModule,
    RmpvDetalheProdutivoModule,
    ComunicadoModule,
    ProdutividadeIndiceModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavegacaoComponent,
    BarraNotificacaoComponent,
    LogoutComponent,
    AdminComponent,
    NotFoundComponent,
    AppDirective
  ],
  providers: [
    AuthGuard,
    AppService,
    AuthenticationService,
    {provide: LOCALE_ID, useValue: 'pt-PT'}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
