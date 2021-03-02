import { AppState } from './../../store/app.reducer';
import * as actions from './album-list.actions';
import { Album } from '../data/album';
import { createSelector } from '@ngrx/store';

export interface State {
  albums: Album[];
}

const initialState: State = {
  albums: []
};


export const selectAlbums = (state: AppState) => state.albumList;


export const selectAlbumCollection = createSelector(
  selectAlbums,
  (state: State) => state.albums
);


export function albumListReducer(state: State | undefined = initialState, action: actions.AlbumListActions): State {
  switch (action.type) {
      case actions.SET_ALBUMS:
        return {...state, albums : [...action.payload]};
      case actions.ADD_ALBUM:
        return {...state, albums: [...state.albums, action.payload]};
      case actions.ADD_ALBUMS:
        return {...state, albums: [...state.albums, ...action.payload]};
      case actions.UPDATE_ALBUM:
        const album = state.albums.filter(e => e.id === action.payload.id )[0];
        const updatedAlbums = [...state.albums];
        updatedAlbums[state.albums.findIndex(e => e.id === album.id)] = {...album, ...action.payload};
        return {...state, albums: updatedAlbums};
      case actions.DELETE_ALBUM:
        return {...state, albums: state.albums.filter(e => e.id !== action.payload.id )};
      default:
        return state;
  }
}
