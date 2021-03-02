import { AlbumService } from './../../services/album.service';
import { StatusResponse } from './../../data/status.response';
import { selectAlbumCollection } from './album-list.reducer';
import { Album } from '../data/album';
import { Injectable } from '@angular/core';
import { Actions,  ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom, tap, exhaustMap } from 'rxjs/operators';

import * as AlbumActions from './album-list.actions';
import * as fromApp from '../../store/app.reducer';

/**
 * @author Attila Barna
 */
@Injectable()
export class AlbumEffects {

  fetchAlbums$ = createEffect(() => {
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


  storeAlbum$ = createEffect(
    () =>  this.actions$.pipe(
            ofType(AlbumActions.STORE_ALBUM),
            withLatestFrom(this.store.select( selectAlbumCollection )),
            exhaustMap(([action, state]) => {
              return this.http.put(
                '/api/album',
                state
              );
            })
        ),
        { dispatch: false }
  );

  createAlbum$ = createEffect(
    () =>  this.actions$.pipe(
            ofType(AlbumActions.CREATE_ALBUM),
            exhaustMap( (action: AlbumActions.CreateAlbum) => {
              return this.albumService.create(action.payload);
            })
        ),
        { dispatch: false }
  );



  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private albumService: AlbumService,
    private store: Store<fromApp.AppState>
  ) {}
}
