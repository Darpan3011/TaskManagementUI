import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task, User } from '../../types';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {

  errorMessageForUser: string | null = null;
  successfullMessageForUser: string | null = null;
  errorMessageForTask: string | null = null;
  successfullMessageForTask: string | null = null;

  form = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(4)]),
    status: new FormControl<number | null>(0, [Validators.required]),
    userId: new FormControl<number | null>(null, [Validators.required]),
    dueDate: new FormControl<string | null>(null, [Validators.required]),
  });

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
    let task: Task = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      status: this.form.value.status!,
      userId: this.form.value.userId!,
      dueDate: this.form.value.dueDate!,
    };
    const addTask = this.taskService.addTask(task!).subscribe({
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
