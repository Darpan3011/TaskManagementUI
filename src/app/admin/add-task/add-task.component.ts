import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { Task, User } from '../../types';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, NgFor],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {

  task: Task | null = {
    title: '',
    description: '',
    status: 0,
    userId: 0,
    dueDate: ''
  };

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);

  users: User[] | null = [];

  ngOnInit() {
    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        // console.log('Users loaded:', this.users);
      },
      error: (err) => console.error('Error loading tasks:', err)
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  onSubmit() {
    const addTask = this.taskService.addTask(this.task!).subscribe();
    console.log(addTask);
  }
}
