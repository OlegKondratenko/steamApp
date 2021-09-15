import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { gamesInterface, gamesSearchQueryInterface } from '../../models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getGames(options: gamesSearchQueryInterface) {
    let { price, genres, name } = options
    let genresQuery: string[] = [];
    if (genres) {
      for (const [key, value] of Object.entries(genres)) {
        if(value){
          genresQuery.push(key)
        }
      }
    }
    return this.http.get<gamesInterface>(`${environment.apiUrl}/api/games?${!!price ? `price=${price}&` : ''}${!!name ? `name=${name}&` : ''}${!!genres ? `genres=${genresQuery.join('+')}&` : ''}`)
  }
  addGameToUserLibrary(gameId:string){
    return this.http.put<gamesInterface>(`${environment.apiUrl}/api/games/${gameId}`,{})
  }

}
