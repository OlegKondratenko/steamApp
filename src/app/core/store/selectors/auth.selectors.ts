import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authStateInterface } from "../reducers/auth.reducers";

export const featureKey = 'authState';

export const selectAuthFeature = createFeatureSelector<authStateInterface>(featureKey);

export const isAuthSelect = createSelector(
  selectAuthFeature,
  (state: authStateInterface) => state.isAuthenticated
);
export const selectCurrUsername= createSelector(
  selectAuthFeature,
  (state: authStateInterface) => state.username
);