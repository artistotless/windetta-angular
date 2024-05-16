import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lobby } from '../../models/lobby.model';
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

  constructor(private _store: Store<IAppStore>) {
    this.lobbies$ = _store.pipe(select(Selectors.allLobbies));
    // this.lobbies$ = of(environment.testLobbies).pipe(delay(2000));
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
