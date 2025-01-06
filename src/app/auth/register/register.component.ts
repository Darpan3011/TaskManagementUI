import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
      errors['PasswordRequiresUpper'] = 'Passwords must have at least one uppercase letter (A-Z).';
    }

    if (!/[0-9]/.test(value)) {
      errors['PasswordRequiresDigit'] = 'Passwords must have at least one digit (0-9).';
    }

    if (!/[^a-zA-Z0-9]/.test(value)) {
      errors['PasswordRequiresNonAlphanumeric'] = 'Passwords must have at least one non-alphanumeric character.';
    }

    return Object.keys(errors).length ? errors : null;
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private destroy = inject(DestroyRef);

  form = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6), passwordValidator()]),
  });
  errorMessage = '';
  successMessage = '';

  onRegister() {
    const s2 = this.authService.RegisterFn(this.form.value.username!, this.form.value.password!).subscribe({
      next: () => {
        this.successMessage = 'Registered Successfully';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/auth', 'login']);
        }, 3000)
      },
      error: (err) => {
        this.successMessage = '';
        if (err.status === 400 && err.error?.errors) {
          const errors = err.error.errors;
          this.errorMessage = Object.values(errors)
            .flat()
            .join(' ');
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    });
  }
}
