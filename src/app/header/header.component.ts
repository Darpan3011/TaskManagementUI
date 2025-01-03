import { Component, computed, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthServiceService);

  userName = computed(() => this.authService.userName);
  isAdmin = computed(() => this.authService.userType() === 'Admin');

  logout() {
    this.authService.logoutFn();
  }
}
