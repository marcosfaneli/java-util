import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValuesAccessorBase } from '../custom-control/ValueAccesorBase';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextBoxComponent,
    multi: true
  }]
})
export class TextBoxComponent extends ValuesAccessorBase<string> implements OnInit {

  @Input() label: string;
  @Input() obrigatorio: Boolean;
  @Input() placeholder: '';
  @Input() name: string;
  @Input() maxLength: Number;
  @Input() mascara: any;

  ngOnInit(): void {}

}
