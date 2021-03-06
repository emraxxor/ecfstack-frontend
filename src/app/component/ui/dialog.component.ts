import { ElementRef } from '@angular/core';
import { Input, Output, Component, EventEmitter, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';



@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {

  @Input() title = 'Dialog';
  @Input() body = '';
  @Input() confirm = false;

  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  @ViewChild('content', { static: true }) content!: ElementRef;


  constructor(
    private modal: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.modal.open(this.content, {ariaLabelledBy: this.title});
  }

  onAccept(modal: NgbModalWindow): void {
    this.accept.emit();
    modal.dismiss('');
  }

  onClose(modal: NgbModalWindow): void {
    this.close.emit();
    modal.dismiss('');
  }

}
