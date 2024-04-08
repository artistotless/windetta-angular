import { Component, Input } from '@angular/core';
import { OngoingMatch } from '../../models/match-info.model';
import { MatchItemComponent } from "../match-item/match-item.component";

@Component({
    selector: 'app-match-list',
    standalone: true,
    templateUrl: './match-list.component.html',
    styles: ``,
    imports: [MatchItemComponent]
})
export class MatchListComponent {
  @Input() matches: Array<OngoingMatch> = [];
}
