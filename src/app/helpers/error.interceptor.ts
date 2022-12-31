import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticateService } from '../admin/services/authentication/authenticate.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    isRefreshRequesting: Boolean = false;
    constructor(
        private authenticateService: AuthenticateService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && request.url.includes('auth/logoutAdminUser')) {
                this.router.navigate(['/admin/auth/login']);
            }else if (err.status === 401 || err.status === 403) {
                // auto logout if 401, 403 response returned from api
                this.authenticateService.logout();
            }

            const error = err.error || err.statusText;
            
            return throwError(() => error);
        }))
    }
}