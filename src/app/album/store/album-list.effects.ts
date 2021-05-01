import { AlbumService } from '../../services/album.service';
import { StatusResponse } from '../../data/status.response';
import { selectAlbumCollection } from './album-list.reducer';
import { Album } from '../data/album';
import { Injectable } from '@angular/core';
import { Actions,  ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map,  exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

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
              return this.http.get<StatusResponse<Album[]>>('/api/album');
            }),
            map(response => {
              return new AlbumActions.SetAlbums(response.object);
            })
      );
  });


  fetchAlbum$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AlbumActions.FETCH_ALBUM_BY_ID),
        switchMap((action: AlbumActions.FetchAlbum) => {
          return this.http.get<StatusResponse<Album>>(`/api/album/${action.id}`);
        }),
        map(response => {
          return new AlbumActions.SetAlbum(response.object);
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
            switchMap( (action: AlbumActions.CreateAlbum) => {
                  return this.http.post<StatusResponse<Album>>(`/api/album`, action.payload);
            }),
            map(res => new AlbumActions.StatusAlbumCreate(res) ),
            catchError(error => of(new AlbumActions.ErrorAlbum(error) )  )
        )
  );



  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private albumService: AlbumService,
    private store: Store<fromApp.AppState>
  ) {}
}
