import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { TaskWithUserName } from '../../types';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading: boolean = false;

  form = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null),
  });

  errorMessage: string | null = null;
  tasks: TaskWithUserName[] | null = [];

  onSortChange(sortBy: string, sortOrder: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy, sortOrder },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit() {

    this.loading = true;
    this.route.queryParams.subscribe((params) => {
      const { sortBy, sortOrder } = params;
      if (sortBy && sortOrder && this.tasks) {
        this.applySort(sortBy, sortOrder);
      }
    });

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
      next: () => {
        this.onSearchTask();
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        this.errorMessage = `Failed to delete the task "${title}". Please try again.`;
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  private applySort(sortBy: string, sortOrder: string): void {
    if (!this.tasks || this.tasks.length === 0) {
      return;
    }

    const isAscending = sortOrder === 'asc';

    this.tasks.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'status') {
        comparison = a.status - b.status;
      } else if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        comparison = (a[sortBy as keyof TaskWithUserName] as string).localeCompare(
          b[sortBy as keyof TaskWithUserName] as string
        );
      }

      return isAscending ? comparison : -comparison;
    });
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
