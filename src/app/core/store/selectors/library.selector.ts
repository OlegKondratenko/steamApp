import { createFeatureSelector, createSelector } from "@ngrx/store";
import { libraryStateInterface } from "../reducers/library.reducers";

export const featureKey = 'libraryState';

export const selectLibraryFeature = createFeatureSelector<libraryStateInterface>(featureKey);

export const librarySelect = createSelector(
  selectLibraryFeature,
  (state: libraryStateInterface) => state.myCollection
);
