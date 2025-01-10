import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

interface CustomJwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

@Component({
  selector: 'app-login',
  imports: [NgIf, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private authService = inject(AuthServiceService);
  private destroy = inject(DestroyRef);
  private router = inject(Router);
  switchLogin = signal(true);
  errorMessage = '';
  isLoading = false;

  form = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    const name = this.form.value.username;
    const password = this.form.value.password;
    const s2 = this.authService.loginFn(name!, password!).subscribe({
      next: (data: any) => {
        this.isLoading = false;

        try {
          localStorage.setItem('Token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);

          const token = jwtDecode<CustomJwtPayload>(data.token);
          const role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          this.authService._userType.set(role as 'Admin' | 'User' | 'Unknown');
          this.authService._userName.set(name!);
          localStorage.setItem('userName', name!);

          if (role === 'Admin') {
            this.router.navigate(['../', 'admin']);
          } else if (role === 'User') {
            this.router.navigate(['../', 'user']);
          } else if (role === 'Unknown') {
            this.router.navigate(['../', 'auth']);
          }
        } catch (error) {
          this.isLoading = false;
          this.errorMessage = 'Invalid token received. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed.';
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }
}
