import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  constructor(private store: Store) { }

  preload() {
  }

}
