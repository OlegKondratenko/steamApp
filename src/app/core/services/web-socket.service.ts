import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: Socket
  constructor() {
    //how make localStorage behave as Observable???
    let user = localStorage.getItem('user')
    let token;
    if (user) {
      token = JSON.parse(user || '')
    }
    this.socket = io(environment.apiUrl, { query: { ...token } })
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }
  changeAuthStatus(){
    let user = localStorage.getItem('user')
    let token;
    if (user) {
      token = JSON.parse(user || '')
    }
    this.socket = io(environment.apiUrl, { query: { ...token } })
  }
}
