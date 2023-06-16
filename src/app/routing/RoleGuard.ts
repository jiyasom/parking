// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Retrieve the user role from your authentication system
    const userRole = 'user'; // Replace with your logic to retrieve the user role

    // Retrieve the required roles for the route
    const requiredRoles = route.data.roles as string[];

    // Check if the user's role is included in the required roles
    const hasPermission = requiredRoles.includes(userRole);

    if (!hasPermission) {
      // Redirect the user to a different route or show an access denied message
      this.router.navigate(['/access-denied']);
    }

    return hasPermission;
  }
}
