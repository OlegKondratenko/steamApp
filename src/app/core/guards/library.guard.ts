import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthSelect } from '../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    isAuth$: Observable<boolean>;
    constructor(
        private store: Store,
    ) {
        this.isAuth$ = store.pipe(select(isAuthSelect))
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.isAuth$
    }
}
