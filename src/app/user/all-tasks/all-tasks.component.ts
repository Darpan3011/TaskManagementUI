import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { StatusPipe } from '../../status.pipe';
import { Router } from '@angular/router';

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
  taskStatus = signal<number>(0);

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


  onStatusChange(taskTitle: string, status: number) {
    const newStatus = Number(this.taskStatus());
    this.taskService.updateTaskStatusUser(taskTitle, newStatus).subscribe({
      next: () => console.log("updated")
      
      
    });
}
}
