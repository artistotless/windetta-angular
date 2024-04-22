import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from './identity.service';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const AuthorizeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  let identityService = inject(IdentityService);
  let currentUrl = `${window.location.origin}${state.url}`;

  return identityService.authenticate().pipe(
    tap(profile => {
      console.log(`CURRENT LOCATION - ${currentUrl}`);
      if (!profile.isAutheticated) {
        console.log(profile);
        window.location.href = `${environment.mvcUrl}/login?returnUrl=${currentUrl}`
      }
    }),

    map(x => x.isAutheticated)
  )
};

