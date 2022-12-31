import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[trim-string]'
})
export class TrimDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('change', ['$event']) onChange() {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.trim().replace(/\s\s+/g, ' ');
  }

}