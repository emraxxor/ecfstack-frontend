import { StatusResponse } from '../../data/status.response';
import { HttpClient } from '@angular/common/http';
import { FileData } from '../../type/file.data';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-photo-view',
  template: `<img #img  [class]="imgclass" [src]="default" alt="">`
})
export class PhotoViewComponent implements OnInit {

  @Input() id!: string;
  @Input() default!: string;
  @Input() imgclass = 'img-thumbnail';

  @ViewChild('img', { static: true }) img!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<StatusResponse<FileData>>(`/api/album/image/${this.id}`)
      .pipe(
        map( (e: StatusResponse<FileData>) => e.object )
      )
      .subscribe(
        res => {
          const image = this.img.nativeElement as HTMLImageElement;
          image.src = `data:image/png;base64,${res.data}`;
        }
      );
  }

}
