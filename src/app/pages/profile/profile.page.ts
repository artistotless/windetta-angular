import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../../models/profile.model';
import { IAppStore } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { profile } from '../../store/profile/profile.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProfileItemComponent } from '../../ui/profile-item/profile-item.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileItemComponent, NgIf, AsyncPipe],
  templateUrl: './profile.page.html',
  styles: ``
})
export class ProfilePage {
  profile$: Observable<IProfile>;

  constructor(private _store: Store<IAppStore>) {
    this.profile$ = this._store.pipe(select(profile));
  }
}
