import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComunicadoService } from '../service/comunicado.service';
import { FileUploader } from 'ng2-file-upload';

declare var $: any;

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  marcadores = [];
  arquivos: Blob[] = [];
  contatos = [];
  titulo = '';
  mensagem = '';
 
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  @ViewChild('fileinput') fileInput: ElementRef;

  @Input() ativo = false;
  @Output() salvado = new EventEmitter<boolean>();
  @Output() ativaComunicado = new EventEmitter<boolean>();


  constructor(private service: ComunicadoService, private toast: ToastrService) { }

  ngOnInit() {
    this.service.buscarContatos()
      .then(res => {
        this.contatos = res.dados;
        this.contatos = this.contatos.map(function(p) {
          const contato = p;
          contato.selecionado = false;
          contato.toTexto = function() {return this.nome};
          return contato;
        });
      })
  }

  contatosSelecionados(): any[] {
    return this.contatos.filter(p => p.selecionado);
  }

  contatosDisponiveis(): any[] {
    return this.contatos.filter(p => !p.selecionado);
  }

  salvarComunicado(): void {
    const form = new FormData();

    const tags = this.marcadores.map(p => p.concat()).toString();
    console.log(tags);

    const contatos = this.contatosSelecionados().map(p => p.id).toString();

    form.append('titulo', this.titulo);
    form.append('mensagem', this.mensagem);
    form.append('remetente', '1');
    form.append('destinatarios', contatos);
    form.append('tags', tags);

    this.uploader.queue.forEach(file => {
      console.log(file._file)
      form.append('file', file._file);
    })

    console.log(form);

    this.service.enviarArquivo(form)
      .then(res => {
        this.toast.success('Novo comunicado enviado', 'Sucesso');
        this.cancelarInclusao();
      })
      .catch(erro => {
        this.toast.error(erro, 'Erro');
      });
  }

  cancelarInclusao(): void {
    this.ativo = false;
    this.salvado.emit(this.ativo);
    this.marcadores = [];
    this.ativaComunicado.emit(true);
  }

  inserirMarcador(event: any): void {
    if (!event.target.value.isEmpty) {
      this.marcadores.push(event.target.value);
      event.target.value = '';
    }
  }

  removerMarcador(marcador): void {
    this.marcadores = this.marcadores.filter(function(value) {
      return value !== marcador;
    });
  }

  adicionarDestinatario(destinatario: any): void {
    destinatario.selecionado = true;
  }

  removerDestinatario(destinatario: any): void {
    this.contatos.map(p => p.selecionado = !(p.id === destinatario.id));
  }

  reloadPage(){
    setTimeout(() => {  
      window.location.reload();
    }, 3000);
  }

  selecionarDestinatario(): void {
    $('#modal-destinatarios').modal();
  }

}
