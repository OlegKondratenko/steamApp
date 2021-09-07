import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    return this.http.get<gamesInterface>(`${environment.apiUrl}/api/library`)
  }
}
