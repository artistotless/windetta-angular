import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { LobbyItemComponent } from '../lobby-item/lobby-item.component';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { UserLobbyMapEntry } from '../../models/user-lobby-map-entry';
import { LobbyItemPlaceholderComponent } from "../lobby-item-placeholder/lobby-item-placeholder.component";

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
  @Output() onJoinLobby = new EventEmitter<string>();
  @Output() onLeaveLobby = new EventEmitter<string>();

  public onJoinClick(lobbyId: string) {
    console.log('LobbyListComponent: onJoinClick');
    this.onJoinLobby.emit(lobbyId);
  }

  public onLeaveClick(lobbyId: string) {
    console.log('LobbyListComponent: onLeaveClick');
    this.onLeaveLobby.emit(lobbyId);
  }
}
