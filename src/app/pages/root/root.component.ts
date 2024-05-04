import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { IAppStore } from '../../app.store';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/profile/profile.actions'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule, JsonPipe, AsyncPipe],
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title = "Windetta";

  private _authSubscription!: Subscription;

  constructor(private _lib: FaIconLibrary, private _store: Store<IAppStore>) {
    this._lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this._store.dispatch(Actions.get());
  }

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
  }
}