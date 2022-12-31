import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[capital-string]'
})
export class CapitalStringDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('change', ['$event']) onChange() {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.toUpperCase();
  }

}