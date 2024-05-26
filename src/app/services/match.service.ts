import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OngoingMatch } from '../models/ongoing-match.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private _client: HttpClient) { }

  getOngoingMatchesIds(): Observable<Array<string>> {
    return this._client.get<Array<string>>(`${environment.apiUrl}/matches/ongoing`)
  }

  getOngoingMatchIdForUser(userId: string): Observable<string> {
    return this._client.get<string>(`${environment.apiUrl}/players/${userId}/matches/ongoing`)
  }

  getOngoingMatchInfo(matchId: string): Observable<OngoingMatch> {
    return this._client.get<OngoingMatch>(`${environment.apiUrl}/matches/ongoing/${matchId}`)
  }
}
