import { Component, Input } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { LobbyItemComponent } from '../lobby-item/lobby-item.component';

@Component({
  selector: 'app-lobby-list',
  standalone: true,
  imports: [LobbyItemComponent],
  templateUrl: './lobby-list.component.html',
  styles: ``
})
export class LobbyListComponent {
  @Input() lobbies: Array<Lobby> = [];
}
