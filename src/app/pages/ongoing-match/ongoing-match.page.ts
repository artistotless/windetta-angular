import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { concatMap, finalize, Observable, tap } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-ongoing-match',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe],
  templateUrl: './ongoing-match.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OngoingMatchPage {
  matchInfo$: Observable<any>

  constructor(
    private _route: ActivatedRoute,
    private _token: TokenService,
    private _match: MatchService) {

    let matchId = this._route.snapshot.params["id"];

    this.matchInfo$ = this._match.getOngoingMatchInfo(matchId).pipe(
      concatMap(match => {
        let ticketValue: string | undefined = undefined;
        return this._token.getRealtimeToken().pipe(
          tap(
            ticket => { ticketValue = ticket; }
          ),
          finalize(() => {
            // saves intermidiate data in sessionStorage
            sessionStorage.setItem("cached_match", JSON.stringify({
              gs_endpoint: match.gameServerEndpoint,
              matchId: match.matchId,
              players: match.players,
              created: match.created,
              bet: match.bet,
              ticket: ticketValue
            }));
            // redirects to game page
            window.location.href = `/game/client?game=${match.gameId}&match=${match.matchId}`;
          }))
      })
    );
  }
}
