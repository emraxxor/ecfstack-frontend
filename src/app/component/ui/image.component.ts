import { Subject } from 'rxjs';
import { FileData } from '../../type/file.data';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-image-component',
  template: `<img #img  [src]="default" [class]="imgclass" alt="">`,
})
export class ImageComponent implements OnInit {

  @Input() subject!: Subject<FileData>;
  @Input() default!: string;
  @Input() imgclass = 'img-thumbnail';

  @ViewChild('img', { static: true }) img!: ElementRef;

  ngOnInit(): void {
    this.subject.subscribe(
      res => {
            const image = this.img.nativeElement as HTMLImageElement;
            if ( res.data ) {
              image.src = `data:image/png;base64,${res.data}`;
            }
      }
    );
  }

}
