import { createReducer, on } from "@ngrx/store";
import { gamesInterface } from "../../models/games";
import { logoutActionCreator, setUserLibrarySuccess } from "../actions/library.action";

export interface libraryStateInterface {
    myCollection: gamesInterface;
}
export const initialLibraryState:libraryStateInterface  = {
    myCollection: {}
};

export const libraryReducer = createReducer(
    initialLibraryState,
    on(setUserLibrarySuccess,(state,games)=>({...state,myCollection:{...games}})),
    on(logoutActionCreator,(state,games)=> initialLibraryState)
  );

