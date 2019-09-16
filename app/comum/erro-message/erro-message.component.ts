import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-erro-message',
  templateUrl: './erro-message.component.html',
  styleUrls: ['./erro-message.component.css']
})
export class ErroMessageComponent {
  @Input() mensagem: string;
}
