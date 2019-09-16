import { ControlValueAccessor } from '@angular/forms';
import { Input } from '@angular/core';
import { Estado } from '../shared/estado.enum';

export class ValuesAccessorBase<T>
implements ControlValueAccessor {

    private innerValue: T;

    @Input() ativo: Boolean = true;
    @Input() state: Estado;

    private changed = new Array<(value: T) => void>();
    private touched = new Array<() => void>();

    get value(): T {
        return this.innerValue;
    }

    set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    touch() {
        this.touched.forEach(f => f());
    }

    writeValue(value: any): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: T) => void) {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    setDisabledState(isDisabled: Boolean): void {}

    getAtivo(): Boolean {
        return this.state !== Estado.view && this.ativo;
    }

}
