import { inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandlerFn,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast'
import { environment } from '../../environments/environment';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let router = inject(Router);
    const started = Date.now();
    let responseType: string;
    let error: { code: string, msg: string } | null;

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
                    error = { code: _error.error.errorCode, msg: _error.error.message }
            }
        }),
        // Log when response observable either completes or errors
        finalize(() => {
            if (environment.enableHttpToasts) {
                const elapsed = Date.now() - started;
                const errorCode = error?.code !== undefined ? `\n ErrorCode: ${error.code}` : '';
                const errorMessage = error?.msg !== undefined ? `\n ErrorMessage: ${error.msg}` : '';
                const msg = `${req.method} "${req.urlWithParams}"
               ${responseType} in ${elapsed} ms. ${errorCode || errorMessage ? '\n' : ''} ${errorCode} ${errorMessage}`;

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
        }));
}