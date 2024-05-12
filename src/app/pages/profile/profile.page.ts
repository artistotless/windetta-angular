import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { IProfile } from '../../models/profile.model';
import { IAppStore } from '../../app.store';
import { Store } from '@ngrx/store';
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
export class ProfilePage implements OnDestroy {
  profile$ = new BehaviorSubject<IProfile | undefined | null>(undefined);
  private _getSub: Subscription | null;

  constructor(private _store: Store<IAppStore>) {
    this._getSub = this._store.select(profile).subscribe(
      p => this.profile$.next(p)
    );
  }

  ngOnDestroy(): void {
    this._getSub?.unsubscribe();
  }
}
