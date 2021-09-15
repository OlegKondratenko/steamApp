import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mapTo, mergeMap } from 'rxjs/operators';
import { LibraryService } from '../../services/library/library.service';
import { fetchUserLibrary, setUserLibraryError, setUserLibrarySuccess } from '../actions/library.action';



@Injectable()
export class LibraryEffects {
  constructor(
    private actions$: Actions,
    private libraryService: LibraryService
  ) {

  }
  loadLibrary$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUserLibrary),
    exhaustMap(
      () => this.libraryService.fetchUserGames()
      .pipe(
        map(games => setUserLibrarySuccess({ ...games })),
        catchError(err => of(setUserLibraryError({ error: err })))
      ))
  )
  );


}
