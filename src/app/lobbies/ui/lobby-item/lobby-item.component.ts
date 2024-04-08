import { Component, Input } from '@angular/core';
import { Lobby } from '../../models/lobby.model';

@Component({
  selector: 'app-lobby-item',
  standalone: true,
  imports: [],
  templateUrl: './lobby-item.component.html',
  styles: ``
})
export class LobbyItemComponent {
  @Input() info: Lobby | undefined;
}
