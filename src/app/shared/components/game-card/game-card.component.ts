import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/games';
import { addGameToUserLibrary } from 'src/app/core/store/actions/games.action';
import { isAuthSelect } from 'src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.sass']
})
export class GameCardComponent {
  @Input() card!: Game;
  @Input() isInLibrary!: boolean;
  isAuth$: Observable<boolean>
  constructor(private store: Store) {
    this.isAuth$ = store.pipe(select(isAuthSelect))
   }

  addGameToLibrary() {
    this.store.dispatch(addGameToUserLibrary({ _id: this.card._id }))
  }
}
