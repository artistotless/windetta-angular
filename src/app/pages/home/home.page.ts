import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { AsyncSubject, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatchListComponent } from '../../ui/match-list/match-list.component';
import { LobbyListComponent } from '../../ui/lobby-list/lobby-list.component';
import { Lobby } from '../../models/lobby.model';
import { RouterLink } from '@angular/router';
import { IAppStore } from '../../app.store';
import { allLobbies } from '../../store/lobbies/lobby.selectors';
import * as LobbyActions from '../../store/lobbies/lobby.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, MatchListComponent, LobbyListComponent, NgFor],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  public lobbies$: Observable<Lobby[]>;

  constructor(private _store: Store<IAppStore>) {
    this.lobbies$ = _store.pipe(select(allLobbies))
  }

  ngOnInit(): void {
    this._store.dispatch(LobbyActions.get());
  }
}