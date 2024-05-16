import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Observable } from 'rxjs';
import { MatchListComponent } from "../../ui/match-list/match-list.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ongoing-matches-list',
  standalone: true,
  templateUrl: './ongoing-matches-list.page.html',
  styles: ``,
  imports: [MatchListComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OngoingMatchesListPage {

  public matches$: Observable<string[]>;

  constructor(private _matchService: MatchService) {
    this.matches$ = this._matchService.getOngoingMatchesIds();
  }
}
