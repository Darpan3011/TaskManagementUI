import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Task, TaskWithUserName, User } from '../../types';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusPipe } from '../../../pipes/status.pipe';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, RouterLink, RouterOutlet, NgIf, DatePipe, StatusPipe],
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class FilterTaskComponent implements OnInit {

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);

  searchtext = '';
  errorMessage: string | null = null;
  tasks: TaskWithUserName[] = [];

  get filteredTasks() {
    return this.tasks?.filter((task: TaskWithUserName) =>
      task.title.toLowerCase().includes(this.searchtext.toLowerCase())
    );
  }

  ngOnInit() {

    const s2 = this.taskService.filterTasks(null, null, null).subscribe({
      next: (data: any) => {
        this.tasks = data;
      },
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  deleteTask(title: string) {
    this.taskService.deleteTheTask(title).subscribe({
      error: (err) => {
        console.error('Error deleting task:', err);
        this.errorMessage = `Failed to delete the task "${title}". Please try again.`;
      },
    });
  }

}
