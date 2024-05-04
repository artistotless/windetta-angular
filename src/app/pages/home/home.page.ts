import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileItemComponent } from '../../ui/profile-item/profile-item.component';
import { IAppStore } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { profile } from '../../store/profile/profile.selectors';
import { Observable, Subscription } from 'rxjs';
import { IProfile } from '../../models/profile.model';
import * as Actions from '../../store/profile/profile.actions';
import * as Selectors from '../../store/profile/profile.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, ProfileItemComponent],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  profile$: Observable<IProfile>;

  constructor(private _store: Store<IAppStore>) {
    this.profile$ = this._store.pipe(select(profile));
  }
}