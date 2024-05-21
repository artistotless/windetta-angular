import { inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandlerFn,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast'
import { environment } from '../../environments/environment';
import { BaseResponse } from '../models/base-response.model';

function isBaseResponse(response: BaseResponse<any> | unknown): response is BaseResponse<any> {
    console.log(response);
    return (<BaseResponse<any>>response).success !== undefined && (<BaseResponse<any>>response).error !== undefined;
}

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let router = inject(Router);
    const started = Date.now();
    let responseType: string;
    let error: string | null;

    req = req.clone({
        withCredentials: true
    });

    return next(req).pipe(
        tap({
            next: (event) => {
                if (event instanceof HttpResponse)
                    responseType = 'succeeded';
            },
            // Operation failed; error is an HttpErrorResponse
            error: (_error) => {
                responseType = "failed";
                if (_error instanceof HttpErrorResponse)
                    error = _error.error
            }
        }),
        // Log when response observable either completes or errors
        finalize(() => {
            if (environment.enableHttpToasts) {
                const elapsed = Date.now() - started;
                const errorMessage = error !== undefined ? `\n ErrorMessage: ${error}` : '';
                const msg = `${req.method} "${req.urlWithParams}"
               ${responseType} in ${elapsed} ms. ${errorMessage ? '\n' : ''} ${errorMessage}`;

                const type = responseType === "failed" ? "is-danger" : "is-success";
                toast({ message: msg, position: "bottom-left", duration: 3000, type: type, pauseOnHover: true, extraClasses: "is-dark" })
            }
        }),
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                let currentUrl = `${window.location.href}`;
                router.navigateByUrl(`/login?returnUrl=${currentUrl}`);
            }
            return throwError(() => error);
        }),
        map(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 204)
                    return event;
                if (isBaseResponse(event.body)) {
                    event = event.clone({ body: event.body.data });
                }
            }
            return event;
        }),
    );
}