import { createAction, props } from "@ngrx/store";
import { gamesInterface } from "../../models/games";

export const fetchUserLibrary = createAction("[Library Component] get user games")

export const setUserLibrarySuccess = createAction("[Library Effect] set user lib in store", props<gamesInterface>())
export const setUserLibraryError = createAction("[Library Effect] show err on fetch user lib", props<{error:string}>())

export const logoutActionCreator = createAction('[Header Component] Log Out');