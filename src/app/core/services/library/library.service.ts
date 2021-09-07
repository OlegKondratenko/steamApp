import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gamesInterface } from '../../models/games';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(
    private http:HttpClient
  ) {

   }
   fetchUserGames(){
    return this.http.get<gamesInterface>(`http://localhost:${process.env.PORT}/api/library`)
  }
}
