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


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './root.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, RouterLink, RouterOutlet, FontAwesomeModule, JsonPipe, AsyncPipe, FooterComponent]
})
export class AppComponent implements OnInit {

  title = "Windetta";

  constructor(private _lib: FaIconLibrary, private _store: Store<IAppStore>) {
    this._lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this._store.dispatch(Actions.get());
  }

  public getProfile(): Observable<IProfile> {
    return this._store.select(profile);
  }
}