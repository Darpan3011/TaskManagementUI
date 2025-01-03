import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private route = inject(Router);

  _isAuthenticated = signal(false);
  _userType = signal<'Admin' | 'User' | 'Unknown'>('Unknown');
  _userName = signal(localStorage.getItem('userName') || ''); // Default to localStorage value
  get userName() {
    return this._userName();
  }
  set userName(value: string) {
    this._userName.set(value);  // Update the signal
    localStorage.setItem('userName', value);  // Also update localStorage
  }

  get userType() {
    return this._userType.asReadonly();
  }

  currUserType = computed(() => this._userType.asReadonly());
  private httpclient = inject(HttpClient);

  constructor() {
    if (localStorage.getItem('Token') && localStorage.getItem('refreshToken')) {
      this._isAuthenticated.set(true);
      const token = jwtDecode<CustomJwtPayload>(localStorage.getItem('Token')!.toString());
      const role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this._userType.set(role as "Admin" | "User" | "Unknown")
    } else {
      this._isAuthenticated.set(false);
      this._userType.set('Unknown');
      this.route.navigate(['/auth', 'login']);

    }
  }

  loginFn(username: string, password: string) {
    return this.httpclient.post('https://localhost:7125/api/Authentication/Login', {
      username,
      password
    });
  }

  RegisterFn(username: string, password: string) {
    return this.httpclient.post('https://localhost:7125/api/Authentication/Register/1', {
      username,
      password
    });
  }

  refreshToken(refreshToken: string) {
    return this.httpclient.post('https://localhost:7125/api/Authentication/RefreshToken', { refreshToken });
  }

  logoutFn() {
    localStorage.removeItem('Token');
    localStorage.removeItem('refreshToken');
    this._isAuthenticated.set(false);
    this._userType.set('Unknown');
    localStorage.removeItem('userName');
    this.route.navigate(['/auth', 'login']);
  }
}
