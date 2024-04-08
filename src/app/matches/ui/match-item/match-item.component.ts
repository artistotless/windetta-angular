import { Component, Input } from '@angular/core';
import { OngoingMatch } from '../../models/match-info.model';

@Component({
  selector: 'app-match-item',
  standalone: true,
  imports: [],
  templateUrl: './match-item.component.html',
  styles: ``
})
export class MatchItemComponent {
  @Input() info: OngoingMatch | undefined
}