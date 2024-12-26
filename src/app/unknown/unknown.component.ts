import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import for jwtDecode

interface CustomJwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

@Component({
  selector: 'app-unknown',
  imports: [FormsModule],
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.css'],
  standalone: true,
})
export class UnknownComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  switchLogin = signal(true);
  username = '';
  password = '';

  onSubmit() {
    this.authService.loginFn(this.username, this.password).subscribe({
      next: (data: any) => {
        try {
          localStorage.setItem('Token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);

          const token = jwtDecode<CustomJwtPayload>(data.token);
          const role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          this.authService._userType.set(role as 'Admin' | 'User' | 'Unknown');
          this.authService._userName.set(this.username);

          if (role === 'Admin') {
            this.router.navigate(['/admin', 'all-task']);
          } else if (role === 'User') {
            this.router.navigate(['/user', 'all-task']);
          } else {
            this.router.navigate(['/unknown']);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }

  onRegister() {
    this.authService.RegisterFn(this.username, this.password).subscribe({
      next: (data: any) => {
        console.log('Register success:', data);
      },
      error: (err) => {
        console.error('Registration error:', err);
      },
    });
  }

  switchLoginMethod() {
    this.switchLogin.set(!this.switchLogin());
  }
}
