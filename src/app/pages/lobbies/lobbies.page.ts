import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, filter, Observable, of, Subscription } from 'rxjs';
import { Lobby, LobbyState } from '../../models/lobby.model';
import { IAppStore } from '../../app.store';
import * as Selectors from '../../store/lobbies/lobby.selectors';
import * as Actions from '../../store/lobbies/lobby.actions';
import { select, Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { LobbyListComponent } from '../../ui/lobby-list/lobby-list.component';
import { UserLobbyMapEntry } from '../../models/user-lobby-map-entry';
import { LobbyCreateComponent } from '../../ui/lobby-create/lobby-create.component';
import { CreateLobbyDto } from '../../models/lobby-create-dto.model';

@Component({
  selector: 'app-lobbies',
  standalone: true,
  imports: [NgIf, AsyncPipe, LobbyListComponent, LobbyCreateComponent],
  templateUrl: './lobbies.page.html',
  styles: ``
})
export class LobbiesPage implements OnInit, OnDestroy {

  public lobbies$: Observable<Lobby[]>;
  public currentLobby$: Observable<UserLobbyMapEntry>;

  private _getSub?: Subscription;

  private testLobbies: Lobby[] = [
    {
      id: "4c2a8057-6de5-43b3-a38c-851bf8f78ef5",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 100, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "ae38cad1-8873-40a7-a9b7-87765ce725b7",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 112, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "f5695436-5c25-4121-adf6-6cd19d7faeef",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 152, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "730c5deb-9bd0-47b8-a35d-6d6cb219b1c1",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 130, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },    {
      id: "61a4b2b9-a7d4-4658-b1f0-0fcf8ef7f52f",
      gameId: "387165a4-0659-4f61-b42e-d0f8ddfc123f",
      bet: { amount: 120, currencyId: 1 },
      rooms: [],
      state: LobbyState.Awaiting,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  constructor(private _store: Store<IAppStore>) {
    this.lobbies$ = _store.pipe(select(Selectors.allLobbies));
    // this.lobbies$ = of(this.testLobbies).pipe(delay(2000));
    this.currentLobby$ = _store.pipe(select(Selectors.currentUserLobby));
  }

  public joinLobby(lobbyId: string) {
    console.log('LobbiesPage: joinLobby');
    this._store.dispatch(Actions.addMember({ lobbyId, roomIndex: 0 }));
  }

  public leaveLobby(lobbyId: string) {
    console.log('LobbiesPage: leaveLobby');
    this._store.dispatch(Actions.removeMember({ lobbyId, roomIndex: 0 }));
  }

  public createLobby(params: CreateLobbyDto) {
    console.log('LobbiesPage: createLobby');
    this._store.dispatch(Actions.create(params));
  }

  ngOnInit(): void {
    this._store.dispatch(Actions.getCurrent())
    this._getSub = this._store
      .select(Selectors.isCached)
      .subscribe(isCached => {
        if (isCached === false)
          this._store.dispatch(Actions.get());
      });
  }

  ngOnDestroy(): void {
    this._getSub?.unsubscribe();
  }
}
