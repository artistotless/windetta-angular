import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map } from 'rxjs';
import * as Selectors from '../store/profile/profile.selectors';
import { IAppStore } from '../app.store';
import { Store } from '@ngrx/store';


export const AuthorizeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  let _store = inject(Store<IAppStore>);
  let _router = inject(Router);
  let currentUrl = `${window.location.origin}${state.url}`;

  return _store.select(Selectors.profile).pipe(
    filter(profile => profile !== undefined),
    map(profile => {
      return profile !== null ? true : _router.parseUrl(`/login?returnUrl=${currentUrl}`);
    })
  )
};