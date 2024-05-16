import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { concatMap, Observable, tap } from 'rxjs';
import { OngoingMatch } from '../../models/ongoing-match.model';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-ongoing-match',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe],
  templateUrl: './ongoing-match.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OngoingMatchPage {
  matchInfo$: Observable<OngoingMatch>

  constructor(
    private _route: ActivatedRoute,
    private _match: MatchService) {

    let matchId = this._route.snapshot.params["id"];

    this.matchInfo$ = _match.getTicket(matchId).pipe(
      concatMap(ticket => {
        return this._match.getOngoingMatchInfo(matchId).pipe(tap(
          match => {
            sessionStorage.setItem("cached_match", JSON.stringify({
              gs_endpoint: match.gameServerEndpoint,
              matchId: match.matchId,
              players: match.players,
              created: match.created,
              bet: match.bet,
              ticket: ticket
            }));

            // redirect to game page
            window.location.href = `/game/client?game=${match.gameId}&match=${match.matchId}`;
          }
        ))
      })
    );
  }
}
