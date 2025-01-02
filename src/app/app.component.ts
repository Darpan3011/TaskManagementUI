import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  providers: [AuthServiceService, AuthGuard]
})
export class AppComponent { }
