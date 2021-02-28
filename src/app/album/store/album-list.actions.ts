import { Album } from './../../data/album';
import { Action } from '@ngrx/store';

export const FETCH_ALBUMS = 'FETCH_ALBUMS';
export const SET_ALBUMS = 'SET_ALBUMS';
export const ADD_ALBUM = 'ADD_ALBUM';
export const ADD_ALBUMS = 'ADD_ALBUMS';
export const UPDATE_ALBUM = 'UPDATE_ALBUM';
export const DELETE_ALBUM = 'DELETE_ALBUM';


export class SetAlbums implements Action {
  readonly type = SET_ALBUMS;
  constructor(public payload: Album[]) {}
}

export class FetchAlbums implements Action {
  readonly type = FETCH_ALBUMS;
}

export class AddAlbum implements Action {
  readonly type = ADD_ALBUM;
  constructor(public payload: Album) {}
}

export class AddAlbums implements Action {
  readonly type = ADD_ALBUMS;
  constructor(public payload: Album[]) {}
}

export class UpdateAlbum implements Action {
  readonly type = UPDATE_ALBUM;
  constructor(public payload: Album ) {}
}

export class DeleteAlbum implements Action {
  readonly type = DELETE_ALBUM;
  constructor(public payload: Album ) {}
}

export type AlbumListActions =
  | AddAlbum
  | AddAlbums
  | UpdateAlbum
  | DeleteAlbum
  | SetAlbums
  ;
