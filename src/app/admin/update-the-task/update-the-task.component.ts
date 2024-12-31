import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Task, User } from '../../types';
import { FormsModule } from '@angular/forms';
import { TaskServiceService } from '../../../services/task-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-update-the-task',
  imports: [FormsModule, NgFor],
  templateUrl: './update-the-task.component.html',
  styleUrl: './update-the-task.component.css'
})
export class UpdateTheTaskComponent implements OnInit {

  @Input({ required: true }) title!: string

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);

  users: User[] | null = [];

  task?: Task;

  ngOnInit() {
    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error: (err) => console.error('Error loading tasks:', err)
    });

    const s1 = this.taskService.getAllTasks().subscribe({
      next: (data: any) => this.task = data?.find((x: Task) => x.title === this.title)
    })

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
    })
  }

  onSubmit() {
    const subscribe = this.taskService.editTheTask(this.task!).subscribe();

    this.destroy.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

}
