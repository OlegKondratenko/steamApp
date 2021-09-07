import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import {authReducer, authStateInterface} from './reducers/auth.reducers';
import { friendsReducer, friendsStateInterface } from './reducers/friends.reducer';
import { gamesReducer, gamesStateInterface } from './reducers/games.reducers';
import { libraryReducer, libraryStateInterface } from './reducers/library.reducers';

export interface State {
  authState: authStateInterface
  gamesState: gamesStateInterface,
  libraryState: libraryStateInterface,
  friendsState: friendsStateInterface
}

export const reducers: ActionReducerMap<State> = {
  authState: authReducer,
  gamesState: gamesReducer,
  libraryState: libraryReducer,
  friendsState: friendsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];