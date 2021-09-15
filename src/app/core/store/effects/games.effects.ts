import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { __await } from 'tslib';
import { GamesService } from '../../services/games/games.service';
import { addGameToUserLibrary, loadGamesAction, setGamesAction, setGamesErrorAction } from '../actions/games.action';
import { fetchUserLibrary } from '../actions/library.action';



@Injectable()
export class GamesEffects {
  constructor(
    private actions$: Actions,
    private gamesService: GamesService
  ) {

  }
  loadGames$ = createEffect(() => this.actions$.pipe(
    ofType(loadGamesAction),
    exhaustMap((act) => this.gamesService.getGames(act)
      .pipe(
        map(games => setGamesAction({ ...games })),
        catchError(err => of(setGamesErrorAction({ error: err })))
      ))
  )
  );
  addGameToUserLib$ = createEffect(() => this.actions$.pipe(
    ofType(addGameToUserLibrary),
    exhaustMap((act) => this.gamesService.addGameToUserLibrary(act._id)
      .pipe(
        map(() => fetchUserLibrary()),
        catchError(err => of(setGamesErrorAction({ error: err })))
      ))
  )
  );



}
