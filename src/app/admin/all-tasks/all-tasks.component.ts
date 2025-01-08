import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Task, TaskWithUserName, User } from '../../types';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusPipe } from '../../../pipes/status.pipe';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, RouterLink, RouterOutlet, NgIf, DatePipe, StatusPipe, ReactiveFormsModule],
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class FilterTaskComponent implements OnInit {

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);
  loading: boolean = false;

  form = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null),
  });

  errorMessage: string | null = null;
  tasks: TaskWithUserName[] | null = [];

  ngOnInit() {

    this.loading = true;
    const s2 = this.taskService.filterTasks(null, null, null).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.tasks = data;
        this.errorMessage = '';
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Failed to fetch the tasks";
      }
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  deleteTask(title: string) {
    const s2 = this.taskService.deleteTheTask(title).subscribe({
      error: (err) => {
        console.error('Error deleting task:', err);
        this.errorMessage = `Failed to delete the task "${title}". Please try again.`;
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }


  onSearchTask() {
    this.loading = true;
    const title = this.form.value.title ? this.form.value.title : null;
    const date = this.form.value.date ? this.form.value.date : null;

    const s2 = this.taskService.filterTasks(title, date, this.form.value.status!).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.tasks = data;
      },
      error: (err) => {
        this.loading = false;
        this.tasks = null;
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })

  }
}
