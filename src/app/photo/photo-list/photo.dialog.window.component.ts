import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PhotoElement} from '../data/photo.element';


export interface PhotoDialogData {
    item: PhotoElement;
}

/**
 * PhotoListComponent is suitable for displaying pictures .
 *
 * @author Attila Barna
 */
@Component({
  selector: 'app-photo-dialog-window',
  templateUrl: './photo.dialog.window.component.html',
  providers : [
    LoadingService
  ],
})
export class PhotoDialogWindowComponent  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhotoDialogData
  ) {

  }

  ngOnInit(): void {
  }

  onClickOK(): void {
     this.dialogRef.close({});
  }
}
