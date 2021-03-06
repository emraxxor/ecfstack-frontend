import { Directive, ElementRef, Renderer2 , OnInit, HostListener, HostBinding, Input} from '@angular/core';

@Directive({
    selector: '[appInputBackground]'
})
export class InputBackgroundDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input() highlightcolor = 'gray';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private ef: ElementRef, private renderer: Renderer2 ) {}

  ngOnInit(): void {}

  @HostListener('mouseenter') mouseover(e: Event): void {
    this.backgroundColor = this.highlightcolor;
  }

  @HostListener('mouseleave') mouseleave(e: Event): void {
    this.backgroundColor = this.defaultColor;
  }
}
