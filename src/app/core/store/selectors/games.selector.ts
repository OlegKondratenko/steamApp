import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gamesStateInterface } from "../reducers/games.reducers";

export const featureKey = 'gamesState';

export const selectGamesFeature = createFeatureSelector<gamesStateInterface>(featureKey);

export const gamesSelect = createSelector(
    selectGamesFeature,
  (state: gamesStateInterface) => state.games
);
export const getGameInfo= createSelector(
    selectGamesFeature,
  (state: gamesStateInterface) => state.gameInfo
);