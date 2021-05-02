import { StatusResponse } from '../../data/status.response';
import { Album } from '../data/album';
import { Action } from '@ngrx/store';

export const FETCH_ALBUMS = '[Albums] FETCH_ALBUMS';
export const FETCH_ALBUM_BY_ID = '[Albums] FETCH_ALBUM_BY_ID';
export const SET_ALBUMS = '[Albums] SET_ALBUMS';
export const SET_ALBUM = '[Albums] SET_ALBUM';
export const ADD_ALBUM = '[Albums] ADD_ALBUM';
export const ADD_ALBUMS = '[Albums] ADD_ALBUMS';
export const UPDATE_ALBUM = '[Albums] UPDATE_ALBUM';
export const DELETE_ALBUM = '[Albums] DELETE_ALBUM';
export const STORE_ALBUM = '[Albums] STORE_ALBUM';
export const CREATE_ALBUM = '[Albums] CREATE_ALBUM';
export const ERROR_ALBUM = '[Albums] ERROR_ALBUM';
export const STATUS_ALBUM_RESPONSE = '[Albums] STATUS ALBUM CREATE';
export const RESET_ALBUM_LIST = '[Albums] RESET_ALBUM';
export const RESET_ALBUM_HTTP_RESPONSE = '[Albums] RESET_ALBUM_HTTP_RESPONSE';

export class SetAlbums implements Action {
  readonly type = SET_ALBUMS;
  constructor(public payload: Album[]) {}
}

export class ResetAlbumList implements Action {
  readonly type = RESET_ALBUM_LIST;
  constructor() {}
}

export class SetAlbum implements Action {
  readonly type = SET_ALBUM;
  constructor(public payload: Album) {}
}

export class FetchAlbums implements Action {
  readonly type = FETCH_ALBUMS;
}

export class FetchAlbum implements Action {
  readonly type = FETCH_ALBUM_BY_ID;
  constructor(public id: number) {}
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

export class ErrorAlbum implements Action {
  readonly type = ERROR_ALBUM;
  constructor(public payload: any) {}
}

export class StatusAlbumResponse implements Action {
  readonly type = STATUS_ALBUM_RESPONSE;
  constructor(public response: StatusResponse<Album>) {}
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
  | ErrorAlbum
  | StatusAlbumResponse
  | SetAlbum
  | ResetAlbumList
  ;
