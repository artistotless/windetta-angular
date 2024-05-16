import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { OngoingMatch } from '../../models/ongoing-match.model';
import { from, mergeMap } from 'rxjs';
import { MatchListComponent } from "../../ui/match-list/match-list.component";
import { MainHubRealtimeService } from '../../services/main-hub-realtime.service';

@Component({
    selector: 'app-ongoing-matches-list',
    standalone: true,
    templateUrl: './ongoing-matches-list.page.html',
    styles: ``,
    imports: [MatchListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OngoingMatchesListPage implements OnInit {

  public matches: Array<OngoingMatch> = [];

  constructor(private _matchService: MatchService) { }

  ngOnInit(): void {

    this._matchService.getOngoingMatchesIds().pipe(
      mergeMap(ids => from(ids).pipe(mergeMap(id => this._matchService.getOngoingMatchInfo(id))))
    ).subscribe((match) => this.matches.push(match));
  }
}
