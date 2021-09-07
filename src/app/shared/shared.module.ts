import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { LibraryComponent } from './components/library/library.component';
import { GamesComponent } from './components/games/games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { MatButtonModule } from '@angular/material/button';

const PUBLIC_COMPONENTS: any[] = [
  FooterComponent,
  HeaderComponent,
  GamesComponent,
  GameCardComponent,
  LibraryComponent,
  AuthComponent,
  UserProfileComponent,
  FriendsComponent,
  FriendCardComponent,
];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];
const MODULES: any[] = [
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  CommonModule,
  MatToolbarModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  MatInputModule,
  MatFormFieldModule,
  MatSliderModule,
  MatButtonModule,
  BrowserModule,
];

@NgModule({
  declarations: [...PUBLIC_COMPONENTS, ...PUBLIC_DIRECTIVES, ...PUBLIC_PIPES],
  imports: [...MODULES],
  exports: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
})
export class SharedModule {}
