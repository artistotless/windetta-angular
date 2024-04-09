import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lobby } from '../models/lobby.model';
import { Observable } from 'rxjs';
import { guid } from 'guid-factory';
import { CreateLobbyDto } from '../models/lobby-create-dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private _client: HttpClient) { }

  getLobbies(): Observable<Array<Lobby>> {
    return this._client.get<Array<Lobby>>(`${environment.apiUrl}/lobbies`)
  }

  createLobby(data: CreateLobbyDto): Observable<Lobby> {
    return this._client.post<Lobby>(`${environment.apiUrl}/lobbies`, data)
  }

  joinRoom(lobbyId: guid, roomIndex: number): Observable<any> {
    return this._client.post(`${environment.apiUrl}/lobbies/${lobbyId}/rooms/${roomIndex}`, null)
  }

  leaveRoom(lobbyId: guid, roomIndex: number): Observable<any> {
    return this._client.post(`${environment.apiUrl}/lobbies/${lobbyId}/rooms/${roomIndex}`, null)
  }
}
