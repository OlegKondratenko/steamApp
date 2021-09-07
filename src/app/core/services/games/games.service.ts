import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<gamesInterface>(`http://localhost:4300/api/games?${!!price ? `price=${price}&` : ''}${!!name ? `name=${name}&` : ''}${!!genres ? `genres=${genresQuery.join('+')}&` : ''}`)
  }
  addGameToUserLibrary(gameId:string){
    return this.http.put<gamesInterface>(`http://localhost:4300/api/games/${gameId}`,{})
  }

}
