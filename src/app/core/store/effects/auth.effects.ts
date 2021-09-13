import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { __await } from 'tslib';
import { AuthService } from '../../services/auth/auth.service';
import { WebSocketService } from '../../services/web-socket.service';
import { changeUserProfileAction, changeUserProfileErrorAction, changeUserProfileSuccessAction, loginUser, loginUserError, loginUserSuccess, registerUser, registerUserError, registerUserSuccess } from '../actions/auth.action';



@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private websocketService: WebSocketService

    ) {

    }
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(registerUser),
        exhaustMap((act) => this.authService.register(act)
            .pipe(
                map(res => registerUserSuccess()),
                catchError(err => of(registerUserError()))
            ))
    )
    );
    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        exhaustMap((act) => this.authService.login({ username: act.username, password: act.password })
            .pipe(
                map(res => {
                    if (res.ok) {
                        localStorage.setItem('user', JSON.stringify({ username: res.body?.username, token: res.body?.token }))
                        this.websocketService.changeAuthStatus()
                        this.router.navigateByUrl('/library');
                        return loginUserSuccess({...res.body})
                    } else {
                        return loginUserError()
                    }
                }),
                catchError(err => {
                    return of(loginUserError())
                })
            ))
    )
    );

    changeUserProfile$ = createEffect(() => this.actions$.pipe(
        ofType(changeUserProfileAction),
        exhaustMap((act) => this.authService.changeUserProfile({ username: act.username, age: act.age, email: act.email })
            .pipe(
                map(res => {
                    if (res.statusText === "OK") {
                        return changeUserProfileSuccessAction(act)
                    }
                    return changeUserProfileErrorAction()
                }),
            ))
    )
    );
}
