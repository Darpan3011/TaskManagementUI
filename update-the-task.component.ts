import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Task, User } from '../../types';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskServiceService } from '../../../services/task-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-the-task',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './update-the-task.component.html',
  styleUrl: './update-the-task.component.css'
})
export class UpdateTheTaskComponent implements OnInit {

  @Input({ required: true }) title!: string | undefined
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);
  private router = inject(Router);

  users: User[] | null = [];

  form = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(4)]),
    status: new FormControl<number | null>(0, [Validators.required]),
    userId: new FormControl<number | null>(null, [Validators.required]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
  });

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
          const date = new Date(foundTask.dueDate);
          date.setDate(date.getDate() + 1); // Add one day
          foundTask.dueDate = date.toISOString().split('T')[0];
          this.form.patchValue(foundTask);
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
    const task: Task = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      status: this.form.value.status!,
      userId: this.form.value.userId!,
      dueDate: this.form.value.dueDate?.toString()!
    }
    const subscribe = this.taskService.editTheTask(task).subscribe({
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
