import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-input-file-component',
  templateUrl: './input.file.component.html',
})
export class InputFileComponent implements OnInit {

  @Input() accept = '.jpg, .jpeg, .png';
  @Input() class = 'text-center center-block file-upload';
  @Output() data = new EventEmitter<{data: string}>();
  @ViewChild('input', { static: true }) input!: ElementRef;

  ngOnInit(): void {
  }

  handleFileInput(e: any): void {
    const ie = e.target;
    const reader = new FileReader();
    reader.onload = (el: any) => {
      const target: any = el.target;
      this.data.emit({ data: btoa(target.result)});
    };
    reader.readAsBinaryString(ie?.files?.item(0));
}

}