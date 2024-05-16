import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import * as ProfileActions from "./profile.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { IdentityService } from "../../services/identity.service";

export const getProfileEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(IdentityService)) => {

        return _actions$.pipe(
            ofType(ProfileActions.get),
            exhaustMap(() =>
                _service.authenticate().pipe(
                    map((profile) => ProfileActions.getSuccess({profile })),
                    catchError((error: { message: string }) =>
                        of(ProfileActions.getFailure({ error: error.message }))
                    ))));
    }, { functional: true });
