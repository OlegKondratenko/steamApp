import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/library.guard';
import { AuthComponent } from './shared/components/auth/auth.component';
import { FriendsComponent } from './shared/components/friends/friends.component';
import { GamesComponent } from './shared/components/games/games.component';
import { LibraryComponent } from './shared/components/library/library.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'auth/?:action', component: AuthComponent },
  { path: 'games', component: GamesComponent },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: GamesComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
