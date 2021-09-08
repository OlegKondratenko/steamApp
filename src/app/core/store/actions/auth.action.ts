import { createAction, props } from '@ngrx/store';


export const loginUser = createAction('[Auth Component] Set Auth', props<{username:string,password:string}>())
export const loginUserSuccess = createAction('[Auth Component] Set Auth data on success', props<{username?:string,token?:string, email?:string,age?:number}>())
export const loginUserError = createAction('[Auth Effect] on user registaration failure');

export const logoutActionCreator = createAction('[Header Component] Log Out');

export const registerUser = createAction('[Auth Component] register User', props<{username:string,password:string}>());
export const registerUserSuccess = createAction('[Auth Effect] on user registration success');
export const registerUserError = createAction('[Auth Effect] on user registaration failure');


export const changeUserProfileAction = createAction('[Profile Component] change user profile info', props<{username:string, age:number,email:string}>());
export const changeUserProfileSuccessAction = createAction('[Profile Component] change user profile info',props<{username:string,email:string, age:number}>());
export const changeUserProfileErrorAction = createAction('[Profile Component] change user profile info');