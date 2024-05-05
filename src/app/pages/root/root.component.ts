import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { IAppStore } from '../../app.store';
import { Store } from '@ngrx/store';
import * as Actions from '../../store/profile/profile.actions'
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../store/profile/profile.selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterOutlet, FontAwesomeModule, JsonPipe, AsyncPipe],
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  title = "Windetta";

  constructor(private _lib: FaIconLibrary, private _store: Store<IAppStore>) {
    this._lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this._store.dispatch(Actions.get());
  }

  public isAuthenticated(): Observable<boolean> {
    return this._store.select(isAuthenticated);
  }
}