import { Directive, ElementRef, Renderer2 , OnInit, HostListener, HostBinding, Input} from "@angular/core";

@Directive({
    selector: '[inputbackground]'
})
export class InputBackgroundDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  @Input() highlightcolor: string = 'gray';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private ef: ElementRef, private renderer: Renderer2 ) {}

  ngOnInit(): void {}

  @HostListener('mouseenter') mouseover(e: Event) {
    this.backgroundColor = this.highlightcolor;
  }

  @HostListener('mouseleave') mouseleave(e: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
