import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task } from '../../types';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { StatusPipe } from '../../../pipes/status.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, StatusPipe, ReactiveFormsModule, DatePipe],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  private taskService = inject(TaskServiceService);
  private router = inject(Router);
  isSuccess = false;
  isError = false;
  taskStatus = signal<number | null>(null);

  form = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null),
  });

  alltasks: Task[] | null = null;


  ngOnInit() {
    this.taskService.filterTasks(null, null, null).subscribe({
      next: (data) => {
        this.alltasks = data as Task[];
      },
      error: (err) => console.error('Error loading tasks:', err),
    });

  }

  onStatusChange(taskTitle: string, status: number) {
    const newStatus = Number(this.taskStatus());
    this.taskService.updateTaskStatusUser(taskTitle, newStatus).subscribe({
      next: () => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
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
  }

  onSearchTask() {

    const title = this.form.value.title ? this.form.value.title : null;
    const date = this.form.value.date ? this.form.value.date : null;
    const status = this.form.value.status ? this.form.value.status : null;

    this.taskService.filterTasks(title, date, status).subscribe({
      next: (data: any) => {
        this.alltasks = data;
      },
      error: (err) => {
        this.alltasks = null;
      }
    });
  }
}