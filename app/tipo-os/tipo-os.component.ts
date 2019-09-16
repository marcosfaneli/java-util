import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TipoOsService } from './tipo-os-service/tipo-os.service';
import { CategoriaOsService } from './tipo-os-service/categoria-os.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-tipo-os',
  templateUrl: './tipo-os.component.html',
  styleUrls: ['./tipo-os.component.css']
})

export class TipoOsComponent implements OnInit {

  carregando = true;
  categorias: any[] = [];
  tipos: any[] = [];
  tiposUndefined: any[] = [];
  todosTipos: any[] = [];
  marcas: any[] = [];

  private __idCategoriaSelecionada = 0;

  constructor(
    private serviceTipoOs: TipoOsService,
    private serviceCategoriaOs: CategoriaOsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregando = true;
    this.carregarLegenda();
    this.carregarCategorias();
  }

  getCor(marca: number): any {
    return marca === 31 ? 'rgb(2, 56, 16)' : marca === 40 ? 'rgb(7, 214, 180)' : 'gray'
  }

  carregarLegenda(): any {
    this.marcas = [];
    this.serviceTipoOs.getFiltroMarcas()
      .then(dados => {
        dados.dados.forEach(item => {
          const marca = item;
          marca.cor = this.getCor(item.id);
          this.marcas.push(marca);
        });
      })
      .catch(error => this.tratarErro('Não foi possível carregar legendas.', 'Erro', <any>error));
  }

  carregarCategorias() {
    this.serviceCategoriaOs.listar([], {})
      .then(dados => {
        this.categorias = dados.dados;
        this.categorias.forEach(categoria => {
          categoria.tipos.forEach(tipo => {
            tipo.cor = this.getCor(tipo.marca);
          });
        });
        this.carregarTipos();
      })
      .catch(error => this.tratarErro('Não foi possível buscar categorias.', 'Erro', <any>error));
  }

  carregarTipos() {
    this.serviceTipoOs.getFiltroTipoOs()
      .then(dados => {
        dados.dados.forEach(item => {
          const tipo = item;
          tipo.cor = this.getCor(item.marca);
          this.todosTipos.push(tipo);
        });
        this.filtrarTiposDisponiveis();
        this.carregando = false;
      })
      .catch(error => this.tratarErro('Erro listando tipos O.S..', 'Erro', <any>error));
  }

  filtrarTiposDisponiveis() {

    this.tipos = [];
    this.tiposUndefined = [];

    this.todosTipos.forEach(item => {
      const tipo = { id: item.id, tipo: item.tipo, descricao: item.descricao, marca: item.marca, cor: item.cor };
      if (this.marcas.findIndex((marca) => marca.id === item.marca) >= 0) {
        this.tipos.push(tipo);
      } else {
        this.tiposUndefined.push(tipo);
      }
    });

    this.categorias.forEach(categoria => {
      let tipoCategoria = [];

      tipoCategoria = categoria.tipos;

      tipoCategoria.forEach(tipo => {
        const index = this.tipos.findIndex((item) => item.id === tipo.id);
        if (index >= 0) {
          this.tipos.splice(index, 1);
        }
      });
    });
  }

  adicionarTipo(id: number) {
    this.__idCategoriaSelecionada = id;
  }

  removerTipoCategoria(idTipoOs, idCategoria: number) {
    let index: number;

    this.serviceCategoriaOs.removerTipoCategoria('categoria_os', idCategoria, idTipoOs)
      .then(resultado => {
        index = this.categorias.findIndex((categoria) => categoria.id === idCategoria);

        const categoriaSelecionada = this.categorias[index];
        const filtros = categoriaSelecionada['tipos'];

        index = filtros.findIndex((item) => item.id === idTipoOs);

        filtros.splice(index, 1);

        this.filtrarTiposDisponiveis();

        this.exibirSucesso('Tipo removido.', 'Sucesso');
      })
      .catch(erro => this.tratarErro('Erro ao remover tipo.', 'Erro', <any>erro));
  }

  adicionarTipoCategoria(tipo) {
    console.log(tipo);
    let index: number;

    this.serviceCategoriaOs.incluirTipoCategoria('categoria_os', this.__idCategoriaSelecionada, tipo.id)
      .then(resultado => {
        index = this.categorias.findIndex((categoria) => categoria.id === this.__idCategoriaSelecionada);
        this.categorias[index].tipos.push({ 'descricao': tipo.descricao, 'id': tipo.id, 'tipo': tipo.tipo, 'cor': tipo.cor });

        this.filtrarTiposDisponiveis();

        this.exibirSucesso('Tipo ' + tipo.descricao + ' incluído.', 'Sucesso');
      })
      .catch(erro => this.tratarErro('Erro ao incluir tipo.', 'Erro', erro));
  }

  exibirSucesso(mensagem: string, titulo: string) {
    this.toastr.success(mensagem, titulo);
  }

  tratarErro(mensagem: string, titulo: string, error: any) {
    this.carregando = false;
    console.error(error);
    let msg: string;
    try {
      if (error.status === 401) {
        this.router.navigateByUrl('logout');
      }
      msg = mensagem + '\n' + error.json().erro;
    } catch (Exception) {
      msg = mensagem;
    }
    this.toastr.error(msg, titulo);
  }

}
