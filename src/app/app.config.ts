import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import * as lobbyEffects from '../app/store/lobbies/lobby.effects';
import * as profileEffects from '../app/store/profile/profile.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { lobbyReducers } from './store/lobbies/lobbies.reducer';
import { profileReducers } from './store/profile/profile.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideStore(),
    provideState({ name: "lobby", reducer: lobbyReducers }),
    provideState({ name: "profile", reducer: profileReducers }),
    provideEffects([lobbyEffects, profileEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    })
  ]
};
