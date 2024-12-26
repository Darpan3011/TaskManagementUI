import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  ngOnInit() {
    const userType = this.authService.currUserType();

    switch (userType()) {
      case 'Admin':
        this.router.navigate(['/admin']);
        break;
      case 'User':
        this.router.navigate(['/user']);
        break;
      case 'Unknown':
      default:
        this.router.navigate(['/unknown']);
        break;
    }
  }
}
