import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isEmpty } from 'lodash'

import { AuthenticateService } from '../services/authentication/authenticate.service';
import { AccessService } from '../services/access/access.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService,
        private accessService: AccessService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdminUser: any = this.authenticateService.currentAdminUserValue;
        if (currentAdminUser && !isEmpty(currentAdminUser)) {
            await this.accessService.setAccessList(currentAdminUser.access_modules);
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/admin/auth/login']);
        return false;
    }
}