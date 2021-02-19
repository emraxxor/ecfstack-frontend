import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUIPlaceholder]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
