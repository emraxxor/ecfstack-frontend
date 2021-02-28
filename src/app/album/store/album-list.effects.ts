import { Album } from './../../data/album';
import { Injectable } from '@angular/core';
import { Actions,  ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as AlbumActions from './album-list.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AlbumEffects {

  fetchAlbums = createEffect(() => {
        return this.actions$.pipe(
            ofType(AlbumActions.FETCH_ALBUMS),
            switchMap(() => {
              return this.http.get<Album[]>('/#todo');
            }),
            map(albums => {
              return new AlbumActions.SetAlbums(albums);
            })
      );
  });


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
