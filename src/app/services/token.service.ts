import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _client: HttpClient) { }

  public getRealtimeToken(): Observable<string> {
    return this._client.get<string>(`${environment.mvcUrl}/tokens/realtime`);
  }

  public getRealtimeTokenPromise(): Promise<string> {
    let client = this._client;

    return <Promise<string>>new Promise(function (resolve, reject) {

      client.get<string>(`${environment.mvcUrl}/tokens/realtime`).subscribe(
        result => resolve(result),
        error => reject(error),
      );
    })
  }
}

