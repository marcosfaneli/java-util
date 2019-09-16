import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormatarData } from '../formatarData';
import { Injectable } from '@angular/core';

@Injectable()
export class TextBoxDataAdapter extends NgbDateAdapter<any> {
    fromModel(value: any): NgbDateStruct {
         const date = new Date(value);
         return { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
    }
    toModel(data: NgbDateStruct): any {
        if (data && data.year) {
            return new FormatarData(
                data.year,
                data.month,
                data.day,
                0,
                0,
                0
                ).getDataString();
        }
    }
}
