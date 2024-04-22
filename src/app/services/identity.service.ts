import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private _profile: BehaviorSubject<Profile> = new BehaviorSubject(new Profile());
  private _initialized: boolean = false;

  currentUser$: Observable<Profile> = this._profile.asObservable();

  constructor(private _client: HttpClient) {
  }

  authenticate(): Observable<Profile> {
    if (!this._initialized)
      return this._client.get<Profile>(`${environment.mvcUrl}/profile`, {
        withCredentials: true
      })
        .pipe(tap(value => {

          this._profile.next(value);
          this._initialized = true;
        }));
    else
      return this.currentUser$;
  }

  setProfile(newProfile: Profile) {
    this._profile.next(newProfile);
  }
}
