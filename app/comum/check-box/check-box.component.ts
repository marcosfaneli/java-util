import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValuesAccessorBase } from '../custom-control/ValueAccesorBase';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckBoxComponent,
    multi: true
  }]
})
export class CheckBoxComponent
  extends ValuesAccessorBase<string>
  implements OnInit {

    @Input() label: string;
    @Input() obrigatorio: Boolean;
    @Input() placeholder: '';
    @Input() name: string;
    @Input() maxLength: Number;

  ngOnInit(): void {}

}
