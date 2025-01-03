import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthServiceService);


  userName = this.authService._userName();

  logout() {
    this.authService.logoutFn();

  }
}
