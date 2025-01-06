import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthServiceService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userType = this.authservice._userType();

        // If the route is for Admin, check if the user is an Admin
        if (route.routeConfig?.path === 'admin') {
            if (userType === 'Admin') {
                console.log("Admin Access Granted 😊");
                return true; // Admin can access the admin route
            } else {
                if (userType == 'User') {
                    console.log("Access Denied for Admin. Redirecting to User route.");
                    this.router.navigate(['/user']); // Redirect to user route
                    return false;
                }
                else if (userType == 'Unknown') {
                    console.log("Access Denied for Admin. Redirecting to login.");
                    this.router.navigate(['/auth', 'login']);
                    return false;
                }
            }
        }

        // If the route is for User, check if the user is a User
        if (route.routeConfig?.path === 'user') {
            if (userType === 'User') {
                console.log("User Access Granted 👍");
                return true; // User can access the user route
            } else {
                if (userType == 'Admin') {
                    console.log("Access Denied for User. Redirecting to Admin route.");
                    this.router.navigate(['/admin']); // Redirect to user route
                    return false;
                }
                else if (userType == 'Unknown') {
                    console.log("Access Denied for User. Redirecting to login.");
                    this.router.navigate(['/auth', 'login']);
                    return false;
                }
            }
        }

        // If user type is unknown, redirect to login page
        console.log("Unknown User. Redirecting to Login page.");
        this.router.navigate(['/auth', 'login']); // Redirect to login page
        return false;
    }
}