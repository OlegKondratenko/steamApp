import { createReducer, on } from "@ngrx/store";
import { Friend } from "../../models/user";
import { getInitInfo, logoutActionCreator, setFriendsAction, setNotAcceptedFriendsAction, setReqFriendsAction } from "../actions/friends.action";

export interface friendsStateInterface {
    friends: Friend[]
    reqSentTo: Friend[]
    reqReseivedFrom: Friend[]
    users: Friend[]
}
export const initialFriendsState: friendsStateInterface = {
    friends: [],
    reqSentTo: [],
    reqReseivedFrom: [],
    users: []
};

export const friendsReducer = createReducer(
    initialFriendsState,
    on(getInitInfo, (state, { friends, reqSentTo, reqReseivedFrom, users }) =>({ ...state, friends, reqSentTo, reqReseivedFrom, users })),
    on(setFriendsAction, (state, { friends, reqSentTo, reqReseivedFrom }) => ({ ...state, friends, reqSentTo, reqReseivedFrom })),
    on(logoutActionCreator, (state) => initialFriendsState),

);
