import { Component, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-text-box-data',
  templateUrl: './text-box-data.component.html',
  styleUrls: ['./text-box-data.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextBoxDataComponent,
    multi: true
  }]
})
export class TextBoxDataComponent
    extends TextBoxComponent
    implements OnInit {

      public customPatterns = {'0': { pattern: new RegExp('\[a-zA-Z\]')}};

    limparData(campo: any) {
      campo._elRef.nativeElement.value = '';
      this.value = null;

    }

}
