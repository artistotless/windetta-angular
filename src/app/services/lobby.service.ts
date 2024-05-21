import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lobby } from '../models/lobby.model';
import { Observable } from 'rxjs';
import { CreateLobbyDto } from '../models/lobby-create-dto.model';
import { environment } from '../../environments/environment';
import { UserLobbyMapEntry } from '../models/user-lobby-map-entry';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private _client: HttpClient) { }

  getUserLobby(userId: string): Observable<UserLobbyMapEntry> {
    return this._client.get<UserLobbyMapEntry>(`${environment.apiUrl}/users/${userId}/lobby`)
  }

  getLobbies(): Observable<Array<Lobby>> {
    return this._client.get<Array<Lobby>>(`${environment.apiUrl}/lobbies`)
  }

  createLobby(data: CreateLobbyDto): Observable<Lobby> {
    return this._client.post<Lobby>(`${environment.apiUrl}/lobbies`, data)
  }

  joinRoom(lobbyId: string, roomIndex: number): Observable<any> {
    return this._client.post(`${environment.apiUrl}/lobbies/${lobbyId}/rooms/${roomIndex}`, null)
  }

  leaveRoom(lobbyId: string, roomIndex: number): Observable<any> {
    console.log("LOBBYSERVICE leaveRoom")
    return this._client.delete(`${environment.apiUrl}/lobbies/${lobbyId}/rooms/${roomIndex}`)
  }
}
