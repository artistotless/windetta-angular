import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { IAppStore } from '../../app.store';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../../store/profile/profile.actions';
import * as LobbyActions from '../../store/lobbies/lobby.actions';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { Observable, Subscription } from 'rxjs';
import { profile } from '../../store/profile/profile.selectors';
import { IProfile } from '../../models/profile.model';
import { FooterComponent } from "../../ui/footer/footer.component";
import { HubEvent, HubEventType, MainHubRealtimeService } from '../../services/main-hub-realtime.service';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    RouterLink,
    RouterOutlet,
    FontAwesomeModule,
    JsonPipe,
    AsyncPipe,
    FooterComponent,
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  title = "Windetta";

  private lobbyEventsSub: Subscription;
  private matchEventsSub: Subscription;

  constructor(
    private _lib: FaIconLibrary,
    private _store: Store<IAppStore>,
    private _router: Router,
    private _hub: MainHubRealtimeService) {

    this._lib.addIcons(faCoffee);

    this.lobbyEventsSub = this._hub.lobbyEvents
      .subscribe(event => this.handleLobbyEvent(event));

    this.matchEventsSub = this._hub.matchEvents
      .subscribe(event => this.handleMatchEvent(event));
  }

  ngOnInit(): void {
    this._hub.start();
    this._store.dispatch(ProfileActions.get());
  }

  ngOnDestroy(): void {
    this.lobbyEventsSub.unsubscribe();
    this.matchEventsSub.unsubscribe();
  }

  public getProfile(): Observable<IProfile | undefined | null> {
    return this._store.select(profile);
  }

  private handleLobbyEvent(event: HubEvent) {

    console.log(event);

    switch (event.type) {
      case HubEventType.AddedLobby:
        this._store.dispatch(LobbyActions.add(event.data))
        break;
      case HubEventType.DeletedLobby:
        this._store.dispatch(LobbyActions.remove({ lobbyId: event.data }))
        break;
      case HubEventType.UpdatedLobby:
        this._store.dispatch(LobbyActions.update(event.data))
        break;
      case HubEventType.ReadyLobby:
        this._store.dispatch(LobbyActions.setReady({ lobbyId: event.data }))
        break;
      default:
        break;
    }
  }

  private handleMatchEvent(event: HubEvent) {
    switch (event.type) {
      case HubEventType.ReadyToConnect:
        this._router.navigateByUrl(`matches/${event.data}`)
        break;
      default:
        console.log(event);
        break;
    }
  }
}