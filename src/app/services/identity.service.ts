import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IProfile } from '../models/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private _client: HttpClient) {
  }

  authenticate(): Observable<IProfile> {
    return this._client.get<IProfile>(`${environment.mvcUrl}/profile`, {
      withCredentials: true
    });
  }
}
