import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {  UserAuthData, userProfileInfoInterface } from '../../models/user';
import { logoutActionCreator } from '../../store/actions/auth.action';
import { authStateInterface } from '../../store/reducers/auth.reducers';
import { WebSocketService } from '../web-socket.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private store: Store<authStateInterface>,
    private websocketService:WebSocketService
  ) {
  }
  register(user: UserAuthData) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, user, { observe: 'response' })
  }
  login(user: UserAuthData) {
    return this.http.post<{username:string,token:string, email:string,age?:number}>(`${environment.apiUrl}/api/auth/login`, user, { observe: 'response' })
  }
  logout() {
    localStorage.removeItem('user');
    this.store.dispatch(logoutActionCreator())
    this.router.navigate(['/games']);
    this.websocketService.changeAuthStatus()
  }
  changeUserProfile(userInfo:userProfileInfoInterface){
    return this.http.put(`${environment.apiUrl}/api/auth/profile`, userInfo,{ observe: 'response' })
  }
}
