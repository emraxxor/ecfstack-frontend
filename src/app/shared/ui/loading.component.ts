import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';

@Component({
  styleUrls: ['loading.component.scss'],
  template: `
    <div class="spinner-container" *ngIf="loadingService.loading | async">
       <mat-spinner></mat-spinner>
    </div>
  `,
  selector: 'app-loading'
})
export class LoadingComponent implements OnInit {

  constructor(
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
  }

}
