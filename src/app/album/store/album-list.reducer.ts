import { StatusResponse } from '../../data/status.response';
import { AppState } from '../../store/app.reducer';
import * as actions from './album-list.actions';
import { Album } from '../data/album';
import { createSelector } from '@ngrx/store';

export interface State {
  albums: Album[];
  album: Album | null;
  actionType: string | null;
  httpResponse: StatusResponse<Album> | null;
  httpError: any | null;
}

const initialState: State = {
  albums: [],
  actionType: null,
  album: null,
  httpResponse: null,
  httpError: null
};

export const selectAlbums = (state: AppState) => state.albumList;

export const selectAlbum = (state: AppState) => state.albumList.album;

export const selectAlbumHttpResponse = (state: AppState) => state.albumList.httpResponse;

export const selectAlbumCollection = createSelector(
  selectAlbums,
  (state: State) => state.albums
);

export function albumListReducer(state: State | undefined = initialState, action: actions.AlbumListActions): State {
  switch (action.type) {
      case actions.SET_ALBUMS:
        return {...state, albums : [...action.payload]};
      case actions.SET_ALBUM:
        return {...state, album : action.payload };
      case actions.ADD_ALBUM:
        return {...state, albums: [...state.albums, action.payload]};
      case actions.ADD_ALBUMS:
        return {...state, albums: [...state.albums, ...action.payload]};
      case actions.UPDATE_ALBUM:
        const album = state.albums.filter(e => e.id === action.payload.id )[0];
        const updatedAlbums = [...state.albums];
        updatedAlbums[state.albums.findIndex(e => e.id === album.id)] = {...album, ...action.payload};
        return {...state, albums: updatedAlbums, actionType: actions.UPDATE_ALBUM};
      case actions.DELETE_ALBUM:
        return {...state, albums: state.albums.filter(e => e.id !== action.payload.id ) , actionType: actions.DELETE_ALBUM };
      case actions.ERROR_ALBUM:
        return {...state, httpError: action.payload };
      case actions.STATUS_ALBUM_RESPONSE:
        return {...state, httpResponse: action.response };
      case actions.RESET_ALBUM_LIST:
        return {
          albums: [],
          actionType: null,
          album: null,
          httpResponse: null,
          httpError: null
        };
      default:
        return state;
  }
}
