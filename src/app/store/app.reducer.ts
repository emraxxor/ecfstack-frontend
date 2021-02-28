import { ActionReducerMap } from '@ngrx/store';
import * as fromAlbumList from '../album/store/album-list.reducer';

export interface AppState {
  albumList: fromAlbumList.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  albumList: fromAlbumList.albumListReducer
};
