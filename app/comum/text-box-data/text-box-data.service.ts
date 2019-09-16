import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormatarData } from '../formatarData';

@Injectable()
export class TextBoxDataService
extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    const date = new Date(value);
    return { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
  }

  format(data: NgbDateStruct): string {
    if (data && data.year) {
      return new FormatarData(
        data.year,
        data.month,
        data.day,
        0,
        0,
        0
        ).getDataFormatada();
      }
      return '';

    }

  }
