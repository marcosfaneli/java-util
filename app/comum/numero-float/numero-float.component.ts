import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-numero-float',
  templateUrl: './numero-float.component.html',
  styleUrls: ['./numero-float.component.css']
})
export class NumeroFloatComponent implements OnInit {

  @Input() valor;
  @Input() nome;
  constructor() { }

  ngOnInit() {
  }

}
