import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
    constructor(private authservice: AuthServiceService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userType = this.authservice.userType();

        if (route.routeConfig?.path === 'user') {
            if (userType !== 'User') {
                console.log("User Access not Granted 😊");
                this.router.navigateByUrl('/auth/login');
                return false;
            }
        }
        return true;
    }
}