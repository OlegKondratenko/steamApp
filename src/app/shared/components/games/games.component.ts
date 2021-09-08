import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { gamesInterface } from 'src/app/core/models/games';
import { loadGamesAction } from 'src/app/core/store/actions/games.action';
import { isAuthSelect } from 'src/app/core/store/selectors/auth.selectors';
import { gamesSelect } from 'src/app/core/store/selectors/games.selector';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {

  isAuth$: Observable<boolean> | boolean
  games$: Observable<gamesInterface>
  form: FormGroup
  value: number
  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.isAuth$ = store.pipe(select(isAuthSelect))
    this.games$ = this.store.pipe(select(gamesSelect))
    this.value = 1000
    this.form = this.fb.group({
      name: ['', []],
      price: [this.value, []],
      genres: fb.group({
        indie: false,
        adventure: false,
        action: false,
      })
    })
    
  }

  ngOnInit(): void {
    this.store.dispatch(loadGamesAction({}));
    this.form.valueChanges.subscribe(val => {
      this.store.dispatch(loadGamesAction(val))
    })
  }
}
