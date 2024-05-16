import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Lobby } from '../models/lobby.model';

export type HubEvent = { type: HubEventType, data?: any }

export const enum HubEventType {
  AddedLobby = "onAddedLobby",
  DeletedLobby = "onDeletedLobby",
  ReadyLobby = "onReadyLobby",
  UpdatedLobby = "onUpdatedLobby",
  ReadyToConnect = "onReadyToConnect",
  ServerFound = "onServerFound",
  MatchCanceled = "onMatchCanceled",
  AwaitingExpired = "onAwaitingExpired",
}

@Injectable({
  providedIn: 'root'
})
export class MainHubRealtimeService {

  public lobbyEvents: Subject<HubEvent> = new Subject();
  public matchEvents: Subject<HubEvent> = new Subject();

  private _connection: SignalR.HubConnection;

  constructor(private _client: HttpClient) {

    let options: SignalR.IHttpConnectionOptions = {
      accessTokenFactory: () => this.getRealtimeToken(),
      withCredentials: false
    };
    this._connection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.mainHubUrl, options)
      .configureLogging(SignalR.LogLevel.Information)
      .build();

    this.subscribeOnLobbyEvents();
    this.subscribeOnMatchEvents();
  }

  start() {
    this._connection?.start().catch(err => console.error(err.toString()));
  }

  private subscribeOnLobbyEvents() {
    this._connection.on(HubEventType.AddedLobby, (lobbyId: string) => {
      this.lobbyEvents.next({ type: HubEventType.AddedLobby, data: lobbyId });
    });

    this._connection.on(HubEventType.DeletedLobby, (lobbyId: string) => {
      this.lobbyEvents.next({ type: HubEventType.DeletedLobby, data: lobbyId });
    });

    this._connection.on(HubEventType.ReadyLobby, (lobbyId: string) => {
      this.lobbyEvents.next({ type: HubEventType.ReadyLobby, data: lobbyId });
    });

    this._connection.on(HubEventType.UpdatedLobby, (lobby: Lobby) => {
      this.lobbyEvents.next({ type: HubEventType.UpdatedLobby, data: lobby });
    });
  }

  private subscribeOnMatchEvents() {
    this._connection.on(HubEventType.ReadyToConnect, (mathId: string) => {
      this.matchEvents.next({ type: HubEventType.ReadyToConnect, data: mathId });
    });

    this._connection.on(HubEventType.ServerFound, () => {
      this.matchEvents.next({ type: HubEventType.ServerFound });
    });

    this._connection.on(HubEventType.MatchCanceled, () => {
      this.matchEvents.next({ type: HubEventType.MatchCanceled });
    });

    this._connection.on(HubEventType.AwaitingExpired, () => {
      this.matchEvents.next({ type: HubEventType.AwaitingExpired });
    });
  }

  private getRealtimeToken(): Promise<string> {
    let client = this._client;

    return <Promise<string>>new Promise(function (resolve, reject) {

      client.get<string>(`${environment.mvcUrl}/tokens/realtime`).subscribe(
        result => resolve(result),
        error => reject(error),
      );
    })
  }
}
