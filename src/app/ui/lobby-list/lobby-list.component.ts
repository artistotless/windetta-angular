import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { LobbyItemComponent } from '../lobby-item/lobby-item.component';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { UserLobbyMapEntry } from '../../models/user-lobby-map-entry';
import { LobbyItemPlaceholderComponent } from "../lobby-item-placeholder/lobby-item-placeholder.component";
import { LeaveLobbyDto } from '../../models/lobby-leave-dto.model';
import { JoinLobbyDto } from '../../models/lobby-join.dto.models';

@Component({
  selector: 'app-lobby-list',
  standalone: true,
  templateUrl: './lobby-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LobbyItemComponent, AsyncPipe, JsonPipe, NgIf, LobbyItemPlaceholderComponent]
})
export class LobbyListComponent {

  @Input() lobbies: Lobby[] = [];
  @Input() currentLobby!: UserLobbyMapEntry;
  @Output() onJoinLobby = new EventEmitter<JoinLobbyDto>();
  @Output() onLeaveLobby = new EventEmitter<LeaveLobbyDto>();

  public onJoinClick(event: JoinLobbyDto) {
    console.log('LobbyListComponent: onJoinClick');
    this.onJoinLobby.emit(event);
  }

  public onLeaveClick(event: LeaveLobbyDto) {
    console.log('LobbyListComponent: onLeaveClick');
    this.onLeaveLobby.emit(event);
  }
}
