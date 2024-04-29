import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lobby } from '../../models/lobby.model';
import { IAppStore } from '../../app.store';
import * as Selectors from '../../store/lobbies/lobby.selectors';
import * as Actions from '../../store/lobbies/lobby.actions';
import { select, Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { LobbyListComponent } from '../../ui/lobby-list/lobby-list.component';

@Component({
  selector: 'app-lobbies',
  standalone: true,
  imports: [NgIf, LobbyListComponent, AsyncPipe],
  templateUrl: './lobbies.page.html',
  styles: ``
})
export class LobbiesPage implements OnInit, OnDestroy {

  public lobbies$: Observable<Lobby[]>;
  private _getSubscription!: Subscription;

  constructor(private _store: Store<IAppStore>) {
    this.lobbies$ = _store.pipe(select(Selectors.allLobbies))
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
