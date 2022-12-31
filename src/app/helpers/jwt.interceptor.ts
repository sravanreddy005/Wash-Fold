import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticateService } from '../admin/services/authentication/authenticate.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentAdminUser = this.authenticateService.currentAdminUserValue;
        const isLoggedIn = currentAdminUser && currentAdminUser.email;
        const storageValue = localStorage.getItem('currentAdminUser'+environment.APP_NAME) ? JSON.parse(localStorage.getItem('currentAdminUser'+environment.APP_NAME)!) : {};
        const isApiUrl = request.url.startsWith(environment.API_URL);
        
        if (isLoggedIn && isApiUrl && storageValue) {
            let token = storageValue.accessToken;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        
        return next.handle(request);
    }
}