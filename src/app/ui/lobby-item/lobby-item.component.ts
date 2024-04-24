import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lobby } from '../../models/lobby.model';
import { DatePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-lobby-item',
  standalone: true,
  imports: [DatePipe, JsonPipe],
  templateUrl: './lobby-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyItemComponent {
  @Input() info: Lobby | undefined;
}
