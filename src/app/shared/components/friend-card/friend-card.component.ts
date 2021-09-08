import { Component, Input, OnInit } from '@angular/core';
import { Friend } from 'src/app/core/models/user';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.sass']
})
export class FriendCardComponent implements OnInit {
  @Input() user!: Friend;
  @Input() role!: 'user' | 'friend' | 'pending';

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {

  }

  addFriend() {
    this.webSocketService.emit('sendFriendReq', this.user.friendId)
  }
  
  removeFriend() {
    this.webSocketService.emit('deleteFriendReq', this.user.friendId)
  }

  rejectFriend() {
    this.webSocketService.emit('rejectFriendReq', this.user.friendId)
  }

  acceptFriend() {

    this.webSocketService.emit('acceptFriendReq', this.user.friendId)
  }


}
