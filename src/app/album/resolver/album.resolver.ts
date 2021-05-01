import { State } from '../store/album-list.reducer';
import { Album } from '../data/album';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions} from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';

@Injectable({ providedIn: 'root' })
export class AlbumResolver implements Resolve<Album | null> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album | null> {
    return this.store.select('albumList')
        .pipe(
            map( (stateAlbum: State) => {
              return stateAlbum.album;
            }),
            switchMap(album => {
              if (album === null && route.params.id !== undefined) {
                this.store.dispatch(new AlbumActions.FetchAlbum(route.params.id));
              }
              return of(album);
            })
        );
  }
}
