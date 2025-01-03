import { Component, ViewEncapsulation } from '@angular/core';
import { Task } from '../types';
import { HeaderComponent } from "../header/header.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'

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
