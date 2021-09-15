import { createAction, props } from '@ngrx/store';
import {  gamesInterface, gamesSearchQueryInterface } from '../../models/games';

export const loadGamesAction = createAction("[Games Component] Load Products",props<gamesSearchQueryInterface>());
export const setGamesAction = createAction('[Games Effect] get most popular games', props<gamesInterface>())
export const setGamesErrorAction = createAction('[Games Effect] on error action', props<{error:any}>());

export const addGameToUserLibrary = createAction('[Card Component] add game to user lib', props<{_id:string}>());
