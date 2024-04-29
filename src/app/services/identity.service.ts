import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';
import { AsyncSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private _profile$: AsyncSubject<Profile> = new AsyncSubject();
  private _initialized: boolean = false;

  user$: Observable<Profile> = this._profile$.asObservable();

  constructor(private _client: HttpClient) {
  }

  authenticate(): Observable<Profile> {
    if (!this._initialized)
      return this._client.get<Profile>(`${environment.mvcUrl}/profile`, {
        withCredentials: true
      })
        .pipe(tap(value => {

          this._profile$.next(value);
          this._profile$.complete();
          this._initialized = true;
        }));
    else
      return this.user$;
  }

  setProfile(newProfile: Profile) {
    this._profile$.next(newProfile);
  }
}
