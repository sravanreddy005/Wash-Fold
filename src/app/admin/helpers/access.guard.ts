import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from '../services/authentication/authenticate.service';
import { AccessService } from '../services/access/access.service';

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService,
        private accessService: AccessService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAdminUser: any = this.authenticateService.currentAdminUserValue;
        if (currentAdminUser) {
            const accessVal = await this.accessService.checkAccess(currentAdminUser.access_modules, route?.routeConfig?.path);
            if(accessVal){
                return accessVal;
            }            
        }
        // not logged in or no access so logging out the user
        this.authenticateService.logout();
        return false;
    }
}