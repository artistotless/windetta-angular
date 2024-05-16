import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OngoingMatch } from '../../models/ongoing-match.model';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-match-item',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './match-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchItemComponent {
  @Input() info: OngoingMatch | undefined
}