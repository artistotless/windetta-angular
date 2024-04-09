import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { guid } from 'guid-factory';
import { OngoingMatch } from '../models/match-info.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private _client: HttpClient) { }

  getOngoingMatchesIds(): Observable<Array<guid>> {
    return this._client.get<Array<guid>>(`${environment.apiUrl}/matches/ongoing`)
  }

  getOngoingMatchIdForUser(userId: guid): Observable<guid> {
    return this._client.get<guid>(`${environment.apiUrl}/players/${userId}/matches/ongoing`)
  }

  getOngoingMatchInfo(matchId: guid): Observable<OngoingMatch> {
    return this._client.get<OngoingMatch>(`${environment.apiUrl}/matches/ongoing/${matchId}`)
  }
}
