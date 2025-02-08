import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Lobby, LobbyState } from '../models/lobby.model';
import { IAppStore } from '../app.store';
import { Store } from '@ngrx/store';
import { HttpTransportType } from '@microsoft/signalr';
import { TokenService } from './token.service';
import { RoomMember } from '../models/room-member.model';

export type HubEvent = { type: HubEventType, data?: any }

export const enum HubEventType {
  AddedLobby = "onAddedLobby",
  DeletedLobby = "onDeletedLobby",
  StateChangedLobby = "onStateChangedLobby",
  AddedLobbyMember = "onAddedLobbyMember",
  RemovedLobbyMember = "onRemovedLobbyMember",
  UpdatedLobby = "onUpdatedLobby",
  ReadyToConnect = "onReadyToConnect",
  ServerFound = "onServerFound",
  MatchCanceled = "onMatchCanceled",
}

@Injectable({
  providedIn: 'root'
})
export class MainHubRealtimeService {
  public lobbyEvents: Subject<HubEvent> = new Subject();
  public matchEvents: Subject<HubEvent> = new Subject();

  private _connection: SignalR.HubConnection;

  constructor(private _token: TokenService, private _store: Store<IAppStore>) {

    let options: SignalR.IHttpConnectionOptions = {
      accessTokenFactory: () => this._token.getRealtimeTokenPromise(),
      transport: HttpTransportType.WebSockets,
      withCredentials: false,
      skipNegotiation: true
    };
    this._connection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.mainHubUrl, options)
      .configureLogging(SignalR.LogLevel.Information)
      .build();

    this.subscribeOnMirror();
    this.subscribeOnLobbyEvents();
    this.subscribeOnMatchEvents();
  }

  start() {
    this._connection?.start().catch(err => console.error(err.toString()));
  }

  private subscribeOnMirror() {
    this._connection.on("mirror", (arg: { method: string, data: any }) => {
      this._connection.send(arg.method, arg.data);
    });
  }

  private subscribeOnLobbyEvents() {
    this._connection.on(HubEventType.AddedLobby, (lobby: Lobby) => {
      this.lobbyEvents.next({ type: HubEventType.AddedLobby, data: lobby });
    });

    this._connection.on(HubEventType.DeletedLobby, (lobbyId: string) => {
      this.lobbyEvents.next({ type: HubEventType.DeletedLobby, data: lobbyId });
    });

    this._connection.on(HubEventType.StateChangedLobby, (lobbyId: string, newState: LobbyState) => {
      this.lobbyEvents.next({ type: HubEventType.StateChangedLobby, data: {lobbyId, newState} });
    });

    this._connection.on(HubEventType.AddedLobbyMember, (lobbyId: string, roomIndex: number, member: RoomMember) => {
      this.lobbyEvents.next({ type: HubEventType.AddedLobbyMember, data:  { lobbyId, roomIndex, member } });
    });

    this._connection.on(HubEventType.RemovedLobbyMember, (lobbyId: string, roomIndex: number, memberId: string) => {
      this.lobbyEvents.next({ type: HubEventType.RemovedLobbyMember, data: { lobbyId, roomIndex, memberId } });
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

    this._connection.on(HubEventType.MatchCanceled, (reason: string) => {
      this.matchEvents.next({ type: HubEventType.MatchCanceled, data: reason });
    });
  }
}
