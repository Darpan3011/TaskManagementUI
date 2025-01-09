import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task } from '../../types';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { StatusPipe } from '../../../pipes/status.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, StatusPipe, ReactiveFormsModule, DatePipe, NgIf],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);
  private router = inject(Router);
  isSuccess = false;
  isError = false;
  isLoading = false;
  taskStatus = signal<number | null>(null);

  form = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null),
  });

  alltasks: Task[] | null = null;

  get GetTasks() {
    return this.taskService.filterTasks(null, null, null).subscribe({
      next: (data) => {
        this.alltasks = data as Task[];
      },
      error: (err) => console.error('Error loading tasks:', err),
    });
  }


  ngOnInit() {
    const s2 = this.GetTasks;
    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })

  }

  onStatusChange(taskTitle: string, status: number) {
    const newStatus = Number(this.taskStatus());
    const s2 = this.taskService.updateTaskStatusUser(taskTitle, newStatus).subscribe({
      next: () => {
        const s2 = this.GetTasks;

        this.destroy.onDestroy(() => {
          s2.unsubscribe();
        })
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      },
      error: (err) => {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  onSearchTask() {
    this.isLoading = true;
    const title = this.form.value.title ? this.form.value.title : null;
    const date = this.form.value.date ? this.form.value.date : null;

    const s2 = this.taskService.filterTasks(title, date, this.form.value.status!).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.alltasks = data;
      },
      error: (err) => {
        this.isLoading = false;
        this.alltasks = null;
      }
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }
}