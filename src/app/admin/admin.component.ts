import { Component } from '@angular/core';
import { Task } from '../types';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',

})
export class AdminComponent {
  updateTask: Task | null = null;

  getTaskForUpdate(task: Task) {
    this.updateTask = task;
  }

  closeModal() {
    this.updateTask = null;
  }
}
