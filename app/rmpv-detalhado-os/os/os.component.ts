import { Component, OnInit, Input } from '@angular/core';
import { OsService } from '../os-service/os.service';
import { ActivatedRoute } from '@angular/router';
import { FiltroService } from '../../comum/filtro/filtro.service';
import { ListItem } from '../../comum/dropdown-list/ListItem';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';
import { EstruturaGridViewBuilder } from '../../comum/gridview/EstruturaGridViewBuilder';
import { IColunaGrid } from '../../comum/gridview/estrutura/IColunaGrid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  carregando = true;
  model: any = {};
  notas: any[] = [];
  _id: string;

  categorias: ListItem[];
  estruturaExecucao: IColunaGrid[];
  estruturaNotas: IColunaGrid[];
  estruturaPecas: IColunaGrid[];

  constructor(
    private service: OsService,
    private route: ActivatedRoute,
    private filtro: FiltroService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.carregarVazio();
    this.route.params.subscribe(param => {
      this.id = param.numero;
      this.buscarOs(this.id);
    })
  }

  @Input() set id(valor: string) {
    this._id = valor;
    this.buscarOs(this.id);
  }

  get id(): string {
    return this._id;
  }

  carregarVazio(): any {
    this.model.cliente = {};
    this.model.consultor = {};
    this.model.pagamento = {};
    this.model.veiculo = {};
    this.model.reclamacoes = [];
    const reclamacao: any = {};
    reclamacao.servicos = [];
    this.model.reclamacoes.push(reclamacao);

    this.criarGridExecucao();
    this.criarGridNotas();
    this.criarGridPecas();
  }

  private criarGridExecucao() {
    this.estruturaExecucao = new EstruturaGridViewBuilder()
      .addColuna('produtivo', 'Produtivo')
      .addColuna('inicio', 'Início')
      .addColuna('fim', 'Fim')
      .addColuna('tempo', 'Tempo')
      .build();
  }

  private criarGridNotas() {
    this.estruturaNotas = new EstruturaGridViewBuilder()
      .addColuna('tipo', 'Tipo')
      .addColuna('numero', 'Número')
      .addColuna('serie', 'Série')
      .addColuna('data', 'Data')
      .addColuna('status', 'Status')
      .build();
  }

  private criarGridPecas() {
    this.estruturaPecas = new EstruturaGridViewBuilder()
      .addColuna('codigo', 'Código')
      .addColuna('descricao', 'Descrição')
      .addColuna('quantidade', 'Qtde')
      .addColuna('valorVenda', 'Vl.Venda')
      .addColuna('valorCusto', 'Vl.Custo')
      .addColuna('desconto', 'Desconto')
      .build();
  }

  private buscarOs(id) {
    if (id) {
      this.service.setUrl(id);

      this.service.get([])
        .then(res => {
          this.tratarDados(res);
          this.carregando = false;
        })
        .catch(error => {
          this.carregando = false;
          this.tratarErro(error);
        });
    }
  }

  private tratarDados(res: any) {
    if (res.dados.length > 0) {
      this.model = res.dados[0];
      this.carregarNotas();
      this.carregarCategorias();
    }
  }

  private tratarErro(error: any) {
    let mensagem: string;
    try {
      mensagem = `Erro carregando os dados da O.S. \n ${error.json().erro}`;
    } catch (Exception) {
      mensagem = 'Erro carregando os dados da O.S.';
    }
    this.toastr.error(mensagem, 'Erro', <any>error);
  }

  private carregarNotas() {
    this.notas = this.model.notasFiscais;
  }

  private carregarExecucoes(execucoes: any[]) {
    const lista: any[] = [];

    execucoes.forEach(item => {
      const a: any = {};
      a.produtivo = item.produtivo.nome;
      a.inicio = item.inicio;
      a.fim = item.fim;
      a.tempo = item.tempo;

      lista.push(a);
    })
    return lista;
  }

  private carregarPecas(pecas: any[]) {
    const lista: any[] = [];

    pecas.forEach(item => {
      const a: any = {};

      a.codigo = item.codigo;
      a.descricao = item.descricao;
      a.quantidade = item.quantidade;
      a.valorVenda = item.valor_venda;
      a.valorCusto = item.valor_custo;
      a.desconto = item.valor_desconto;

      lista.push(a);
    })
    return lista;
  }

  private carregarCategorias() {
    this.categorias = [];

    if (this.model.categoria) {
      const builder = new ListitemBuilder();
      this.filtro.buscar('categoria_os')
        .then(res => {
          res.filtros.forEach(element => {
            builder.add(element.id, element.descricao);
          });

          this.categorias = builder.build();
        });
    }
  }
}
