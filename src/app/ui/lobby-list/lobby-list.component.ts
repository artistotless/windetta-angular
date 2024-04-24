import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { LobbyItemComponent } from '../lobby-item/lobby-item.component';
import { IdentityService } from '../../services/identity.service';
import { Profile } from '../../models/profile.model';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-lobby-list',
  standalone: true,
  imports: [LobbyItemComponent, AsyncPipe, JsonPipe, NgIf],
  templateUrl: './lobby-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyListComponent {
  @Input() lobbies: Array<Lobby> = [];

  constructor(public _identity: IdentityService) {
  }
}
