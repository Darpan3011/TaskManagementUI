import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { StatusPipe } from '../../../pipes/status.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, StatusPipe],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  searchtext = '';
  private taskService = inject(TaskServiceService);
  private router = inject(Router);
  isSuccess = false;
  isError = false;
  taskStatus = signal<number | null>(null);

  get filteredTasks() {
    return this.alltasks?.filter((task: any) =>
      task.title.toLowerCase().includes(this.searchtext.toLowerCase())
    );
  }

  alltasks: Task[] | null = null;

  tasks$ = this.taskService.filterTasks(null, null, null);

  ngOnInit() {
    this.tasks$.subscribe({
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
}

// const currentUrl = this.router.url;
// this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//   this.router.navigate([currentUrl]);
// });
