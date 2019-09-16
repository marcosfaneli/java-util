import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-janela',
  templateUrl: './janela.component.html',
  styleUrls: ['./janela.component.css']
})
export class JanelaComponent implements OnInit {

  @Input() idModal;
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
