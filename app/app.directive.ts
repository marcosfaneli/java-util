import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class AppDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter (targetElement) {
      const clickedOutSide = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedOutSide) {
          this.clickOutside.emit(null);
      }
    }
}
