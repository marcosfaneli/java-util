import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-textbox-nocontainer',
  templateUrl: './text-box-no-container.component.html',
  styleUrls: ['./text-box-no-container.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextBoxNoContainerComponent,
    multi: true
  }]
})
export class TextBoxNoContainerComponent extends TextBoxComponent  implements OnInit {

@Input() label: string;
@Input() obrigatorio: Boolean;
@Input() placeholder: '';
@Input() name: string;
@Input() maxLength: Number;
@Input() mascara: any;

ngOnInit(): void {}
}
