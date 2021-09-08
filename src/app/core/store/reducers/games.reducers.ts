import { createReducer, on } from "@ngrx/store";
import { Game, gamesInterface } from "../../models/games";
import { setGamesAction } from "../actions/games.action";

export interface gamesStateInterface {
    games: gamesInterface;
    gameInfo: Game|null;
}
export const initialGamesState:gamesStateInterface  = {
games: {},
gameInfo :null
};

export const gamesReducer = createReducer(
    initialGamesState,
    on(setGamesAction, (state,games) =>({...state, games: {...games}} )),
    
  );

