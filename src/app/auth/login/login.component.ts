import { Component, inject, signal } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface CustomJwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private authService = inject(AuthServiceService);
  private router = inject(Router);
  switchLogin = signal(true);
  username = '';
  password = '';
  errorMessage = '';

  onSubmit() {
    this.errorMessage = '';
    this.authService.loginFn(this.username, this.password).subscribe({
      next: (data: any) => {
        try {
          localStorage.setItem('Token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);

          const token = jwtDecode<CustomJwtPayload>(data.token);
          const role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          this.authService._userType.set(role as 'Admin' | 'User' | 'Unknown');
          this.authService._userName.set(this.username);
          localStorage.setItem('userName', this.username);

          if (role === 'Admin') {
            this.router.navigate(['../', 'admin', 'all-task']);
          } else if (role === 'User') {
            this.router.navigate(['../', 'user', 'all-task']);
          } else if (role === 'Unknown') {
            this.router.navigate(['../', 'auth', 'login']);
          }
        } catch (error) {
          this.errorMessage = 'Invalid token received. Please try again.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed.';
      },
    });
  }
}
