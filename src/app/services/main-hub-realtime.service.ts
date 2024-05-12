import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainHubRealtimeService {

  public lobbyEvents: Subject<any> = new Subject();

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
  }

  start() {
    this._connection?.start().catch(err => console.error(err.toString()));
  }

  private subscribeOnLobbyEvents() {
    this._connection.on('onAddedLobby', (data: any) => {
      this.lobbyEvents.next(data);
    });

    this._connection.on('onDeletedLobby', (data: any) => {
      this.lobbyEvents.next(data);
    });

    this._connection.on('onReadyLobby', (data: any) => {
      this.lobbyEvents.next(data);
    });

    this._connection.on('onUpdateddLobby', (data: any) => {
      this.lobbyEvents.next(data);
    });
  }

  private getRealtimeToken(): Promise<string> {

    let client = this._client;

    return <Promise<string>>new Promise(function (resolve, reject) {

      client.get<{ token: string }>(`${environment.mvcUrl}/tokens/realtime`).subscribe(
        result => resolve(result.token),
        error => reject(error),
      );
    })
  }
}
