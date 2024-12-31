import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task, User } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {

  errorMessageForUser: string | null = null;
  successfullMessageForUser: string | null = null;
  errorMessageForTask: string | null = null;
  successfullMessageForTask: string | null = null;

  task: Task | null = {
    title: '',
    description: '',
    status: 0,
    userId: 0,
    dueDate: ''
  };

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);
  private router = inject(Router);

  users: User[] | null = [];

  ngOnInit() {
    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.successfullMessageForUser = 'received user'
      },
      error: () => {
        this.errorMessageForUser = 'Failed to load users. Please try again later.';
      }
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  onSubmit() {
    const addTask = this.taskService.addTask(this.task!).subscribe({
      next: () => {
        this.successfullMessageForTask = 'task added successfully';

        setTimeout(() => {
          this.router.navigate(['/admin', 'all-task']);
        }, 1500)
      },
      error: () => {
        this.errorMessageForTask = 'task not added';
      }
    });

    this.destroy.onDestroy(() => {
      addTask.unsubscribe();
    })
  }
}
