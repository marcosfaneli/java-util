import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { DealerService } from '../dealer-service/dealer.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { ListItem } from '../../comum/dropdown-list/ListItem';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { BuscaCep } from '../../comum/cep/busca-cep';

@Component({
  selector: 'app-dealer-cadastro',
  templateUrl: './dealer-cadastro.component.html',
  styleUrls: ['./dealer-cadastro.component.css']
})
export class DealerCadastroComponent extends CrudBase implements OnInit {

  public phone = 123456789;
  public mask: [string];

  itensTipoDealer: ListItem[];
  itensStatusDealer: ListItem[];
  itensPais: ListItem[];
  itensRegiao: ListItem[];
  itensUF: ListItem[];
  itensCidade: ListItem[];
  itensGrupo: ListItem[];
  itensGrupoImp: ListItem[];
  itensMercado: ListItem[];
  itensRAM: ListItem[];
  itensRTM: ListItem[];
  itensRBM: ListItem[];
  itensMKT: ListItem[];
  carregando: Boolean = false;

  constructor(service: DealerService, toastr: ToastrService, private filtroService: FiltroService, private buscaCep: BuscaCep) {
    super(service, toastr);
  }


  ngOnInit() {
    if (!this.model) {
      this.model = {};
    }

    this.defineModelVazio();
    this.carregarDDL();
  }

  novo() {
    super.novo();
    this.defineModelVazio();
  }

  async buscarCEP() {
    if (this.model.endereco.cep.length !== 8) {
      return;
    }

    this.carregando = true;

    await this.buscaCep.get(this.model.endereco.cep)
      .then(response => {
        let element = response.json()
        
        console.log(element);

        this.model.endereco.idPais = element.idPais;
        this.model.endereco.idRegiao = element.idRegiao;
        this.model.endereco.idUF = element.idUf;
        this.model.endereco.idCidade = element.idCidade;
        this.model.endereco.logradouro = element.logradouro;
        this.model.endereco.bairro = element.bairro;
        this.model.endereco.complemento = element.complemento;
    
        this.carregarDDLPais();
        this.carregarDDLRegiao();
        this.carregarDDLUF();
        this.carregarDDLCidade();

        this.carregando = false;
    }).catch((error) => {
      this.carregando = false;

      this.toastr.warning('CEP não encontrado.');
    });
    
  }

  filtrarEstado(value: number) {
    this.model.endereco.idRegiao = value;
    this.carregarDDLUF();
  }

  filtrarCidade(value) {
    this.model.idUF = value;
    this.carregarDDLCidade();
  }

  // == [ INICIO: Métodos Auxiliares ] ==
  private carregarDDL() {
    this.carregarDDLTipoDealer();
    this.carregarDDLStatusDealer();
    this.carregarDDLPais();
    this.carregarDDLRegiao();
    this.carregarDDLUF();
    this.carregarDDLCidade();
    this.carregarDDLGrupo();
    this.carregarDDLGrupoImportador();
    this.carregarDDLMercado();
    this.carregarDDLRAM();
    this.carregarDDLRTM();
    this.carregarDDLRBM();
    this.carregarDDLMKT();
  }

  private carregarDDLTipoDealer() {
    this.itensTipoDealer = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('tipo_dealer')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensTipoDealer = builder.build();
      });
  }

  private carregarDDLStatusDealer() {
    this.itensStatusDealer = new ListitemBuilder()
      .add(true, 'Ativo')
      .add(false, 'Inativo')
      .build();
  }

  private carregarDDLPais() {
    this.itensPais = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('pais')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });

        this.itensPais = builder.build();
      });
  }

  private carregarDDLRegiao() {
    this.itensRegiao = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('regiao')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });

        this.itensRegiao = builder.build();
      });
  }

  private carregarDDLUF() {
    this.itensUF = [];

    if (this.model.endereco.idRegiao) {
      const builder = new ListitemBuilder();
      this.filtroService.buscar('estado/'.concat(this.model.endereco.idRegiao))
        .then(res => {
          res.filtros.forEach(element => {
            builder.add(element.id, element.descricao);
          });
          this.itensUF = builder.build();
        });
    }
  }

  private carregarDDLCidade() {
    this.itensCidade = [];
    if (this.model.endereco.idUF) {
      const builder = new ListitemBuilder();
      this.filtroService.buscar('cidade/'.concat(this.model.endereco.idUF))
        .then(res => {
          res.filtros.forEach(element => {
            builder.add(element.id, element.descricao);
          });

          this.itensCidade = builder.build();
        });
    }
  }

  private carregarDDLGrupo() {
    this.itensGrupo = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('grupo_economico')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });

        this.itensGrupo = builder.build();
      });
  }

  private carregarDDLGrupoImportador() {
    this.itensGrupoImp = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('grupo_importador')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });

        this.itensGrupoImp = builder.build();
      });
  }

  private carregarDDLMercado() {
    this.itensMercado = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('mercado')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensMercado = builder.build();
      });
  }

  private carregarDDLRAM() {
    this.itensRAM = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('usuario_fabrica/ram')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensRAM = builder.build();
      });
  }

  private carregarDDLRTM() {
    this.itensRTM = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('usuario_fabrica/rtm')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensRTM = builder.build();
      });
  }

  private carregarDDLRBM() {
    this.itensRBM = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('usuario_fabrica/rbm')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensRBM = builder.build();
      });
  }

  private carregarDDLMKT() {
    this.itensMKT = [];
    const builder = new ListitemBuilder();
    this.filtroService.buscar('usuario_fabrica/mkt')
      .then(res => {
        res.filtros.forEach(element => {
          builder.add(element.id, element.descricao);
        });
        this.itensMKT = builder.build();
      });
  }

  protected defineModelVazio() {
    if (this.state === Estado.insert) {
      this.model.id = null;
      this.model.idTipo = '';
      this.model.status = '';
      this.model.endereco = {};
      this.model.endereco.cep = '';
      this.model.endereco.idPais = '';
      this.model.endereco.idRegiao = '';
      this.model.endereco.idUF = '';
      this.model.endereco.idCidade = '';
      this.model.jlr = {};
      this.model.jlr.areaManagerRam = '';
      this.model.jlr.areaManagerRtm = '';
      this.model.jlr.areaManagerRbm = '';
      this.model.jlr.areaManagerMkt = '';
      this.model.jlr.idGrupo = '';
      this.model.jlr.idGrupoImportador = '';
      this.model.jlr.idMercado = '';
      this.model.contato = {};
      this.model.contatoTitular = {};
    }
  }

};


