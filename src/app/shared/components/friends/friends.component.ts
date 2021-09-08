import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/core/models/user';
import { WebSocketService } from 'src/app/core/services/web-socket.service';
import { getInitInfo, setFriendsAction } from 'src/app/core/store/actions/friends.action';
import { friendsStateInterface } from 'src/app/core/store/reducers/friends.reducer';
import { friendsSelect, sentToSelect, unacceptedFriendsSelect, usersSelect } from 'src/app/core/store/selectors/friends.selectors';

@Component({
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})


export class FriendsComponent implements OnInit {
  users$!: Observable<Friend[]>
  friends$!: Observable<Friend[]>
  unacceptedFriends$!: Observable<Friend[]>
  requestedFriends$!: Observable<Friend[]>
  form: FormGroup
  isSearchingMode: boolean = false
  constructor(
    private webSocketService: WebSocketService,
    private store: Store<friendsStateInterface>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', []],
    })
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(usersSelect))
    this.friends$ = this.store.pipe(select(friendsSelect))
    this.unacceptedFriends$ = this.store.pipe(select(unacceptedFriendsSelect))
    this.requestedFriends$ = this.store.pipe(select(sentToSelect))

    this.form.valueChanges.subscribe(val => {
      if (val.name === '') {
        this.isSearchingMode = false
      } else {
        this.isSearchingMode = true
      }
      this.webSocketService.emit('searchUsers', { name: val.name })
    })

    this.webSocketService.emit('init', {})
    this.webSocketService.listen('init').subscribe((data: any) => {
      const { friends, reqSentTo, reqReseivedFrom } = data.friends
      const { users } = data
      this.store.dispatch(getInitInfo({ friends, reqSentTo, reqReseivedFrom, users }))
    })
    this.webSocketService.listen('friendsChanged').subscribe((data: any) => {
      const { friends, reqSentTo, reqReseivedFrom } = data
      this.store.dispatch(setFriendsAction({ friends, reqSentTo, reqReseivedFrom }))
    })
  }

}
