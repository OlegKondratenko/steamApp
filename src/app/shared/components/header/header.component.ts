import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isAuthSelect } from 'src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>
  constructor(
    store: Store,
    private authService: AuthService,
  ) {
    this.isAuth$ = store.pipe(select(isAuthSelect))
  }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }
}
