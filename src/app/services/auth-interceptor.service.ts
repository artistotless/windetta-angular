import { inject } from '@angular/core';
import {
    HttpRequest,
    HttpEventType,
    HttpHandlerFn,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    let router = inject(Router);
    let cookies = inject(CookieService);

    req = req.clone({
        withCredentials: true
    });

    return next(req).pipe(

        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('User is not authenticated!')
                let currentUrl = `${window.location.href}`;
                cookies.deleteAll();
                router.navigateByUrl(`/login?returnUrl=${currentUrl}`);
            }
            return throwError(() => error);
        }));
}