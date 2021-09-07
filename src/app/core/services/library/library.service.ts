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
    return this.http.get<gamesInterface>(`https://store-steam.herokuapp.com/api/library`)
  }
}
