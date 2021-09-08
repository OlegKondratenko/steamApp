import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { gamesInterface } from 'src/app/core/models/games';
import { fetchUserLibrary } from 'src/app/core/store/actions/library.action';
import { libraryStateInterface } from 'src/app/core/store/reducers/library.reducers';
import { librarySelect } from 'src/app/core/store/selectors/library.selector';

@Component({
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {
  games$!: Observable<gamesInterface>
  constructor(
    private store: Store<libraryStateInterface>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fetchUserLibrary())
    this.games$ = this.store.pipe(select(librarySelect))
  }

}
