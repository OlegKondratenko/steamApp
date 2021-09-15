import { createAction, props } from '@ngrx/store';
import { Friend } from '../../models/user';


export const getInitInfo = createAction('[friends Component] Set init info', props<{
    friends: Friend[]
    reqSentTo: Friend[]
    reqReseivedFrom: Friend[]
    users:Friend[]
}>())
export const setFriendsAction = createAction('[Friends Card Component] Set friends', props<{
    friends: Friend[]
    reqSentTo: Friend[]
    reqReseivedFrom: Friend[]
}>())
export const setReqFriendsAction = createAction('[friends Component] Set outcomming resquest', props<{requestedFriends: Friend[]}>())
export const setNotAcceptedFriendsAction = createAction('[Auth Component] Set incomming requests', props<{notAcceptedFriends: Friend[]}>())

export const logoutActionCreator = createAction('[Header Component] Log Out');