import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { IAppStore } from '../../app.store';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/profile/profile.actions';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { Observable } from 'rxjs';
import { profile } from '../../store/profile/profile.selectors';
import { IProfile } from '../../models/profile.model';
import { FooterComponent } from "../../ui/footer/footer.component";
import { MainHubRealtimeService } from '../../services/main-hub-realtime.service';


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
export class AppComponent implements OnInit {

  title = "Windetta";

  constructor(private _lib: FaIconLibrary, private _store: Store<IAppStore>, private _hub: MainHubRealtimeService) {
    this._lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this._hub.start();
    this._hub.lobbyEvents.subscribe(event => console.log(event));
    this._store.dispatch(Actions.get());
  }

  public getProfile(): Observable<IProfile | undefined | null> {
    return this._store.select(profile);
  }
}