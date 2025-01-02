import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Task, User } from '../../types';
import { FormsModule } from '@angular/forms';
import { TaskServiceService } from '../../../services/task-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-the-task',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './update-the-task.component.html',
  styleUrl: './update-the-task.component.css'
})
export class UpdateTheTaskComponent implements OnInit {

  @Input({ required: true }) title!: string
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);
  private router = inject(Router);

  users: User[] | null = [];

  task!: Task;

  ngOnInit() {
    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load users. Please try again later.';
      }
    });

    const s1 = this.taskService.getAllTasks().subscribe({
      next: (data: any) => {
        const foundTask = data?.find((x: Task) => x.title === this.title);
        if (foundTask) {
          this.task = foundTask;
        } else {
          this.errorMessage = 'Task not found.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks. Please try again later.';
      }
    });

    this.destroy.onDestroy(() => {
      s1.unsubscribe();
      s2.unsubscribe();
    });
  }


  onSubmit() {
    const subscribe = this.taskService.editTheTask(this.task!).subscribe({
      next: () => {
        this.successMessage = 'Task updated successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/admin', 'all-task']);
        }, 1500)
      },
      error: () => {
        this.errorMessage = 'Failed to update the task. Please try again.';
        this.successMessage = null;
      }
    });

    this.destroy.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }


}
