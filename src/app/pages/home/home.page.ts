import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatchListComponent } from '../../ui/match-list/match-list.component';
import { LobbyListComponent } from '../../ui/lobby-list/lobby-list.component';
import { Lobby, LobbyState } from '../../models/lobby.model';
import { RouterLink } from '@angular/router';
import { IAppStore } from '../../app.store';
import * as Selectors from '../../store/lobbies/lobby.selectors';
import * as Actions from '../../store/lobbies/lobby.actions';
import { select, Store } from '@ngrx/store';
import { RoomMember } from '../../models/room-member.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, MatchListComponent, LobbyListComponent, NgFor],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, OnDestroy {

  public lobbies$: Observable<Lobby[]>;
  private _getSubscription!: Subscription;

  constructor(private _store: Store<IAppStore>) {
    this.lobbies$ = _store.pipe(select(Selectors.allLobbies))

    setTimeout(() => {
      this._store.dispatch(Actions.createSuccess({
        bet: { amount: 1000, currencyId: 1 },
        created: new Date(Date.now()),
        updated: new Date(Date.now()),
        gameId: "38d17e15-051b-4a29-a64c-b88f8c273dad",
        id: "9020163d-6a9d-443b-a14d-e2491eb1c72d",
        state: LobbyState.Awaiting,
        rooms: [{ members: [], index: 0, maxMembers: 20}],
      }))
    }, 2000)

    const memberTest: RoomMember = {
      id: "43c34e43-8f2f-4f6c-97fd-fd310149fa22",
      name: "Joseph"
    };

    setTimeout(() => {
      this._store.dispatch(Actions.addMemberSuccess({ lobbyId: "9020163d-6a9d-443b-a14d-e2491eb1c72d", roomIndex: 0, member: memberTest }));
    }, 3000);

    setTimeout(() => {
      this._store.dispatch(Actions.addMemberSuccess({ lobbyId: "9020163d-6a9d-443b-a14d-e2491eb1c72d", roomIndex: 0, member: memberTest }));
    }, 3400);

    setTimeout(() => {
      this._store.dispatch(Actions.addMemberSuccess({ lobbyId: "9020163d-6a9d-443b-a14d-e2491eb1c72d", roomIndex: 0, member: memberTest }));
      this._store.dispatch(Actions.addMemberSuccess({ lobbyId: "9020163d-6a9d-443b-a14d-e2491eb1c72d", roomIndex: 0, member: memberTest }));
    }, 3800);

    setTimeout(() => {
      this._store.dispatch(Actions.removeMemberSuccess({ lobbyId: "9020163d-6a9d-443b-a14d-e2491eb1c72d", roomIndex: 0, memberId: "43c34e43-8f2f-4f6c-97fd-fd310149fa22" }));
    }, 3810);
  }

  ngOnInit(): void {
    this._getSubscription = this._store
      .select(Selectors.isCached)
      .subscribe(isCached => {
        if (isCached === false)
          this._store.dispatch(Actions.get());
      });
  }

  ngOnDestroy(): void {
    this._getSubscription.unsubscribe();
  }
}