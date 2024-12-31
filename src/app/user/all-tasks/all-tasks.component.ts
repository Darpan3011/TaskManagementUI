import { Component, inject } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent {

  searchtext = '';
  private taskService = inject(TaskServiceService);

  get filteredTasks() {
    return this.alltasks?.filter((task: any) =>
      task.title.toLowerCase().includes(this.searchtext.toLowerCase())
    );
  }

  alltasks: Task[] | null = null;

  tasks$ = this.taskService.getAllTasks();

  ngOnInit() {
    this.tasks$.subscribe({
      next: (data) => {
        this.alltasks = data as Task[];
      },
      error: (err) => console.error('Error loading tasks:', err),
    });

  }
}
