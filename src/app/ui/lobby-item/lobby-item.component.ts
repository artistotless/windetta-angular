import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { DatePipe, NgIf } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-lobby-item',
  standalone: true,
  imports: [DatePipe, JsonPipe, NgIf],
  templateUrl: './lobby-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyItemComponent {
  @Input() info!: Lobby;
  @Input() isJoined!: boolean;
  @Output() onJoinClick = new EventEmitter<string>();
}