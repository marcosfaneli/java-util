import { RmpvDetalheProdutivoComponent } from './../rmpv-detalhe-produtivo/rmpv-detalhe-produtivo.component';
import { NotificacaoHistoricoComponent } from './../comum/barra-notificacao/notificacao-historico/notificacao-historico.component';
import { BarraNotificacaoComponent } from './../comum/barra-notificacao/barra-notificacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { DealerComponent } from '../dealer/dealer.component';
import { RmpvServicoComponent } from '../rmpv-servico/rmpv-servico.component';
import { TipoOsComponent } from '../tipo-os/tipo-os.component';
import { TipoDealerComponent } from '../tipo-dealer/tipo-dealer.component';
import { GrupoImportadorComponent } from '../grupo-importador/grupo-importador.component';
import { QuartilComponent } from '../quartil/quartil.component';
import { LogoutComponent } from '../auth-guard/logout/logout.component';
import { GrupoEconomicoComponent } from '../grupo-economico/grupo-economico.component';
import { FuncaoComponent } from '../funcao/funcao.component';
import { ProdutividadeIndiceComponent } from '../produtividade-indice/produtividade-indice.component';
import { UsuarioDealerComponent } from '../usuario-dealer/usuario-dealer.component';
import { UsuarioFabricaComponent } from '../usuario-fabrica/usuario-fabrica.component';
import { RegionalComponent } from '../regional/regional.component';
import { AdminComponent } from '../auth-guard/admin/admin.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../auth-guard/auth.guard';
import { OsComponent } from '../rmpv-detalhado-os/os/os.component';
import { RmpvPecaComponent } from '../rmpv-peca/rmpv-peca.component';
import { RmpvPassagemComponent } from '../rmpv-passagem/rmpv-passagem.component';
import { RmpvDetalhadoComponent } from '../rmpv-detalhado/rmpv-detalhado.component';
import { ProdutividadeComponent } from '../produtividade/produtividade.component';
import { RmpvMensalComponent } from '../rmpv-mensal/rmpv-mensal.component';
import { RmpvPassagemMensalComponent } from '../rmpv-passagem-mensal/rmpv-passagem-mensal.component';
import { RmpvPecaMensalComponent } from '../rmpv-peca-mensal/rmpv-peca-mensal.component';
import { ComunicadoComponent } from '../comunicado/comunicado.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'barra-notificacao',
    component: BarraNotificacaoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Barra de Notificações' }
  },
  {
    path: 'notificacao-historico',
    component: NotificacaoHistoricoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Notificação \/ Histórico de Notificações' }
  },
  {
    path: 'dealer',
    component: DealerComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Dealer' }
  },
  {
    path: 'tipo-dealer',
    component: TipoDealerComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Tipo Dealer' }
  },
  {
    path: 'grupo-importador',
    component: GrupoImportadorComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Grupo Importador' }
  },
  {
    path: 'grupo-economico',
    component: GrupoEconomicoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Grupo Econômico' }
  },
  {
    path: 'funcao',
    component: FuncaoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Função' }
  },
  { path: 'produtividade-indice',
    component: ProdutividadeIndiceComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: 'Parâmetros \/ Índice Produtividade'}
  },
  { path: 'produtividade',
    component: ProdutividadeComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Produtividade' }
  },
  {
    path: 'produtividade/dealer/produtivo',
    component: RmpvDetalheProdutivoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Produtividade\/Dealer\/Produtivo' }
  },
  {
    path: 'quartil',
    component: QuartilComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Quartil' }
  },
  {
    path: 'rmpv/oficina',
    component: RmpvServicoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Oficina' }
  },
  {
    path: 'rmpv/mensal',
    component: RmpvMensalComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Mensal' }
  },
  {
    path: 'rmpv/peca',
    component: RmpvPecaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Peças' }
  },
  {
    path: 'rmpv/peca/mensal',
    component: RmpvPecaMensalComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Peça \/ Mensal' }
  },
  {
    path: 'rmpv/passagem',
    component: RmpvPassagemComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Passagem' }
  },
  {
    path: 'rmpv/passagem/mensal',
    component: RmpvPassagemMensalComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Passagem \/ Mensal' }
  },
  {
    path: 'rmpv/detalhado',
    component: RmpvDetalhadoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'RMPV \/ Detalhado' }
  },
  {
    path: 'tipo-os',
    component: TipoOsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Tipo O.S.' }
  },
  {
    path: 'os/:numero',
    component: OsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'O.S.' }
  },
  {
    path: 'regional',
    component: RegionalComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Regional' }
  },
  {
    path: 'usuario_dealer',
    component: UsuarioDealerComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Usuário Dealer' }
  },
  {
    path: 'usuario_fabrica',
    component: UsuarioFabricaComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Parâmetros \/ Usuário Fábrica' }
  },
  {
    path: 'comunicado',
    component: ComunicadoComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Comunicados ' }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { breadcrumb: 'Login' }
  },
  {
    path: 'login',
    component: AdminComponent,
    data: { breadcrumb: 'Admin' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { breadcrumb: 'Logout' }
  },
  {
    path: 'not_found',
    component: NotFoundComponent
  },
  { path: '*path', redirectTo: 'not_found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
  declarations: []
})
export class AppRoutingModule { }
