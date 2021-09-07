import { createFeatureSelector, createSelector } from "@ngrx/store";
import { friendsStateInterface } from "../reducers/friends.reducer";

export const featureKey = 'friendsState';

export const selectFriendsFeature = createFeatureSelector<friendsStateInterface>(featureKey);

export const friendsSelect = createSelector(
    selectFriendsFeature,
  (state: friendsStateInterface) => state.friends
);
export const unacceptedFriendsSelect = createSelector(
    selectFriendsFeature,
  (state: friendsStateInterface) => state.reqReseivedFrom
);

export const usersSelect = createSelector(
    selectFriendsFeature,
  (state: friendsStateInterface) => state.users
);
export const sentToSelect = createSelector(
  selectFriendsFeature,
(state: friendsStateInterface) => state.reqSentTo
);