import { Component, inject, signal } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  switchLogin = signal(true);
  username = '';
  password = '';
  errorMessage = '';

  onRegister() {
    this.authService.RegisterFn(this.username, this.password).subscribe({
      next: (data: any) => {
        console.log('Register success:', data);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';

      },
    });
  }
}
