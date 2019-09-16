import { Component, OnInit } from '@angular/core';
import { CrudBase } from '../../comum/crud/CrudBase';
import { UsuarioFabricaService } from '../usuario-fabrica-service/usuario-fabrica.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../comum/shared/estado.enum';
import { ListitemBuilder } from '../../comum/dropdown-list/ListItemBuilder';
import { Parametro } from '../../comum/service-base/parametro';

@Component({
  selector: 'app-usuario-fabrica-cadastro',
  templateUrl: './usuario-fabrica-cadastro.component.html',
  styleUrls: ['./usuario-fabrica-cadastro.component.css']
})
export class UsuarioFabricaCadastroComponent
  extends CrudBase
  implements OnInit {

  itensAtivo: any;
  itensFuncao: any;

  constructor(
    service: UsuarioFabricaService,
    toastr: ToastrService
  ) {
    super(service, toastr);
    this.carregarAtivo();
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {};
    }
    this.defineModelVazio();
  }

  private carregarAtivo() {
    this.itensAtivo =
    new ListitemBuilder()
      .add(true, 'Ativo')
      .add(false, 'Inativo')
      .build();
  }

  novo() {
    super.novo();
    this.defineModelVazio();
  }

  private defineModelVazio() {
    if (this.state === Estado.insert) {
      this.model.id = null;
      this.model.funcao = '';
      this.model.ativo = '';
    }
  }

  protected mensagemSucesso() {
    if (this.state === Estado.insert) {
      const mensagem = 'Novo usuário incluído. \n Um e-mail para definição de senha foi enviado para '.concat(this.model.email).concat('.');
      this.toastr.success(mensagem, 'Usuário criado');
    } else {
      this.toastr.success('Salvo com sucesso!', 'Usuário atualizado');
    }
  }

  salvarComValidacao(event: any) {
    if (this.model.senha !== this.model.senha_confirmada) {
      this.toastr.warning('Confirmação de senha inválida!', 'Validação');
      return;
    }
    super.salvar();
  }

  private solicitarRedefinicaoSenha() {
    if (!this.model.email) {
      this.toastr.warning('E-mail do usuário não informado no cadastro.', 'Validação');
      return;
    }

    const params: Parametro[] = [];

    params.push(new Parametro('rota', 'redefinir_senha'));
    params.push(new Parametro('id', this.model.id));

    this.service.get(params)
      .then(() => {
        const mensagem = `Alteração de senha solicitada. \n Um e-mail para definição de senha foi enviado para ${this.model.email}.`;
        this.toastr.success(mensagem, 'Solicitação enviada');
      })
      .catch(error => {
        this.tratarErro('Não foi possível solictar redefinição de senha', 'Solicitação não enviada', error);
      });
  }
}
