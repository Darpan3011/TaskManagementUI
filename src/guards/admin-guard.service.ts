import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthServiceService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userType = this.authservice._userType();

        if (route.routeConfig?.path === 'admin') {
            if (userType !== 'Admin') {
                console.log("Admin Access not Granted 😊");
                this.router.navigateByUrl('/auth/login');
                return false;
            }
        }
        return true;
    }
}