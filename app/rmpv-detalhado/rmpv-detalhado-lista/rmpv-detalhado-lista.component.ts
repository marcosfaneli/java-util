import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListaBase } from '../../comum/crud/ListaBase';
import { RmpvDetalhadoService } from '../rmpv-detalhado-service/rmpv-detalhado.service';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rmpv-detalhado-lista',
  templateUrl: './rmpv-detalhado-lista.component.html',
  styleUrls: ['./rmpv-detalhado-lista.component.css']
})
export class RmpvDetalhadoListaComponent extends ListaBase implements OnInit {

  @Output() os = new EventEmitter();

  configShowNumber = {
    animation: 'count',
    format: '(.ddd),dd'
  };

  totais: any = {};
  paginaAtual = 1;
  visualizarTotalRegistros: boolean;

  constructor(service: RmpvDetalhadoService, toastr: ToastrService, router: Router) {
    super(service, toastr, router);
    this.visualizarTotalRegistros = false;
    this.listagemComPaginacao = true;
    this.quantidadeRegistrosPagina = 50;
    this.filtros = {};
    this.exibirBotaoDetalhesIcon = true;
    this.nomeModulo = 'detalhado';
    this.fechaCarregando();
  }

  @Input() set carregar(valores: any[]) {
    if (valores.length > 0) {

      this.limparFiltros();

      this.carregando = true;
      valores.forEach(item => {
        new FiltroDealer(
          new FiltroMarca(
            new FiltroTiposOs(new FiltroEspecifico(null))
          )
        ).gerar(item, this.filtros);
      });

      this.buscar();
    }
  }

  limparFiltros() {
    this.filtros.gruposEconomicos = null;
    this.filtros.data_inicial = null;
    this.filtros.data_final = null;
    this.filtros.numero = null;
    this.filtros.chassi = null;
    this.filtros.placa = null;
    this.filtros.tipos = null;
    this.filtros.dealers = null;
    this.filtros.marcas = null;
  }

  ngOnInit() {
    this.estrutura = new EstruturaGridViewBuilder()
      .addColuna('numero', 'O.S.')
      .addColuna('cliente_nome', 'Cliente')
      .addColuna('modelo', 'Modelo')
      .addColuna('chassi', 'Chassi')
      .addColunaNumerica('valor_servico', 'Valor Serviço')
      .addColunaNumerica('valor_peca', 'Valor Peça')
      .addColunaNumerica('faturamento', 'Faturamento')
      .addColuna('status', 'Status')
      .addColuna('tipoOs', 'Tipo Os')
      .build();
  }

  protected getListagemComFiltros(): boolean {
    return this.filtros.gruposEconomicos
      || this.filtros.numero
      || this.filtros.chassi
      || this.filtros.data_inicial
      || this.filtros.data_final;
  }

  getDados(response: any): any {
    const dados = [];

    this.totais.valor_servico = response.valor_servico;
    this.totais.faturamento = response.faturamento;
    this.totais.valor_peca = response.valor_peca;
    this.totais.quantidade = response.quantidade;

    response.dados.forEach(element => {
      const item = element;

      item.cliente_nome = element.cliente.nome;
      item.chassi = element.veiculo.chassi;
      item.modelo = element.veiculo.modelo;
      item.tipoOs = element.tipo.tipo;
      item.faturamento = item.faturamento.toFixed(2);
      item.horas_vendidas = item.horas_vendidas.toFixed(2);
      item.horas_trabalhadas = item.horas_trabalhadas.toFixed(2);

      dados.push(item);
    });

    return response.dados;

  }

  fechaCarregando() {
    this.carregando = false;
  }

  ver(item: any) {
    // this.router.navigateByUrl(`os/${item.registro.id}`)
    this.os.emit(item.registro.id);
  }

}

abstract class GerarFiltro {

  proximoGerador: GerarFiltro;

  constructor(proximoGerador: GerarFiltro) {
    this.proximoGerador = proximoGerador;
  }

  public abstract gerar(item: any, filtros: any);

}

class FiltroDealer extends GerarFiltro {

  public gerar(item: any, filtros: any) {
    if (item.chave === 'dealers') {
      const itens: string[] = [];
      item.valor.forEach(element => {
        itens.push(element);
      });
      filtros.dealers = itens;
    } else {
      this.proximoGerador.gerar(item, filtros);
    }
  }
}

class FiltroMarca extends GerarFiltro {

  public gerar(item: any, filtros: any) {
    if (item.chave === 'marcas') {
      const itens: string[] = [];
      item.valor.forEach(element => {
        itens.push(element);
      });
      filtros.marcas = itens;
    } else {
      this.proximoGerador.gerar(item, filtros);
    }
  }
}

class FiltroTiposOs extends GerarFiltro {

  public gerar(item: any, filtros: any) {
    if (item.chave === 'marcas') {
      const itens: string[] = [];
      item.valor.forEach(element => {
        itens.push(element);
      });
      filtros.tipos = itens;
    } else {
      this.proximoGerador.gerar(item, filtros);
    }
  }
}

class FiltroEspecifico extends GerarFiltro {

  public gerar(item: any, filtros: any) {
    filtros[item.chave] = item.valor;
  }

}
