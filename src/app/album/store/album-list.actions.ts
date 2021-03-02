import { Album } from '../data/album';
import { Action } from '@ngrx/store';

export const FETCH_ALBUMS = '[Albums] FETCH_ALBUMS';
export const SET_ALBUMS = '[Albums] SET_ALBUMS';
export const ADD_ALBUM = '[Albums] ADD_ALBUM';
export const ADD_ALBUMS = '[Albums] ADD_ALBUMS';
export const UPDATE_ALBUM = '[Albums] UPDATE_ALBUM';
export const DELETE_ALBUM = '[Albums] DELETE_ALBUM';
export const STORE_ALBUM = '[Albums] STORE_ALBUM';
export const CREATE_ALBUM = '[Albums] CREATE_ALBUM';

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
  constructor(public payload: Album) {}
}

export class CreateAlbum implements Action {
  readonly type = CREATE_ALBUM;
  constructor(public payload: Album) {}
}


export class StoreAlbum implements Action {
  readonly type = STORE_ALBUM;
}


export type AlbumListActions =
  | AddAlbum
  | AddAlbums
  | UpdateAlbum
  | DeleteAlbum
  | SetAlbums
  | StoreAlbum
  | CreateAlbum
  ;
