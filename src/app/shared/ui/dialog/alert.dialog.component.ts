import {Component, Inject, OnInit} from '@angular/core';
import {LoadingService} from '../../../services/loading.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface AlertDialogData {
  title: string;
  text: string;
}

/**
 * PhotoListComponent is suitable for displaying pictures .
 *
 * @author Attila Barna
 */
@Component({
  selector: 'app-alert-dialog-window',
  templateUrl: './alert.dialog.component.html',
  providers : [
    LoadingService
  ],
})
export class AlertDialogComponent  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  ngOnInit(): void {
  }

  onClickOK(): void {
    this.dialogRef.close({});
  }
}
