import { Router} from '@angular/router';
import { ItemEvent } from '../../component/table/event/item.event';
import { HttpClient } from '@angular/common/http';
import { AlbumDataTable } from './album.data.table';
import {OnInit, Component, OnDestroy} from '@angular/core';
import {AlbumType} from './album.type';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {takeUntil, withLatestFrom} from 'rxjs/operators';
import {StatusCode} from '../../data/status.response';
import {AlertDialogComponent} from '../../shared/ui/dialog/alert.dialog.component';
import {MatDialog} from '@angular/material/dialog';

/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-manager-component',
  templateUrl: './album.manager.component.html'
})
export class AlbumManagerComponent implements OnInit, OnDestroy {
  dataTable = new AlbumDataTable(this.http);
  private unsubscribeNotifier = new Subject<void>();

  constructor(
      private http: HttpClient,
      private router: Router,
      private store: Store<fromApp.AppState>,
      private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this
        .store
        .pipe(
          takeUntil(this.unsubscribeNotifier),
          withLatestFrom(e => e.albumList.httpResponse)
        )
        .subscribe( (response) => {
          if (response?.code === StatusCode.OK) {
            this.dialog.open(AlertDialogComponent, {
              width: '40%',
              data: {
                title: 'Alert',
                text: 'Album is removed successfully!'
              }
            });
          } else {
            if (response && response.code === StatusCode.INVALID) {
              this.dialog.open(AlertDialogComponent, {
                width: '40%',
                data: {
                  title: 'Alert',
                  text: 'Something went wrong, try again later!'
                }
              });
            }
          }
        });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new AlbumActions.ResetAlbumList());
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  onItemClicked( e: ItemEvent): void {
      this.router.navigate(['/album', e.row.id]);
  }

  handleClickOnEdit(row: AlbumType): void {
      this.router.navigate(['/album/edit', row.id]);
  }

  handleClickOnDelete(row: AlbumType): void {
       this.store.dispatch(new AlbumActions.DeleteAlbum(row));
  }
}
