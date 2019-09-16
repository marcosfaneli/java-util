import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-text-box-password',
  templateUrl: './text-box-password.component.html',
  styleUrls: ['./text-box-password.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextBoxPasswordComponent,
    multi: true
  }]
})
export class TextBoxPasswordComponent
extends TextBoxComponent {

}
