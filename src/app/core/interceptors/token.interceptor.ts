import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable({providedIn:'root'})
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
      let user = localStorage.getItem('user')
      let token = !!user? JSON.parse(user).token : ""
      let tokenizedReq = req.clone({setHeaders:{
          Authorization: `Bearer ${token}`
      }})
    return next.handle(tokenizedReq);
  }
}