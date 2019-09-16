import { Component, OnInit, Input } from '@angular/core';
import { ComunicadoService } from '../service/comunicado.service';

@Component({
  selector: 'app-exibir',
  templateUrl: './exibir.component.html',
  styleUrls: ['./exibir.component.css']
})
export class ExibirComponent implements OnInit {

  @Input() comunicado: any = null;

  constructor(private service: ComunicadoService) { }

  ngOnInit() {
  }

  download(id: number) {
    const arquivo = this.comunicado.anexos.filter(p => p.id === id)[0];

    this.service.downloadDoArquivo(arquivo.chave, arquivo.tipo)
      .subscribe(res => {
        const newBlob = res.blob();

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
        link.download = arquivo.nome;

        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      }
      );
  }

}
