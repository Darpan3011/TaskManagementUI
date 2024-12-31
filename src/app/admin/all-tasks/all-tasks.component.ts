import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Task, TaskWithUserName, User } from '../../types';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, RouterLink, RouterOutlet, NgIf],
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class FilterTaskComponent implements OnInit {

  private taskService = inject(TaskServiceService);
  private destroy = inject(DestroyRef);

  searchtext = '';
  errorMessage: string | null = null;
  users: User[] | null = null;
  alltasks: Task[] | null = null;
  tasksWithUserName: TaskWithUserName[] = [];
  tasks$ = this.taskService.getAllTasks();


  get filteredTasks() {
    return this.tasksWithUserName?.filter((task: TaskWithUserName) =>
      task.title.toLowerCase().includes(this.searchtext.toLowerCase())
    );
  }

  ngOnInit() {

    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.mapTasksWithUserNames();
      },
      error: (err) => this.errorMessage = 'Failed to load users. Please try again.'
    });


    const s1 = this.tasks$.subscribe({
      next: (data: any) => {
        this.alltasks = data;
        this.mapTasksWithUserNames();
      },
      error: (err) => this.errorMessage = 'Failed to load users. Please try again.'
    });

    this.destroy.onDestroy(() => {
      s2.unsubscribe();
      s1.unsubscribe();
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

  private mapTasksWithUserNames() {
    if (this.alltasks && this.users) {
      this.tasksWithUserName = this.alltasks.map((task) => {
        const user = this.users?.find((u) => u.userId === task.userId.toString());
        return {
          title: task.title,
          description: task.description,
          status: task.status,
          userName: user ? user.userName : 'Unknown',
          dueDate: task.dueDate,
        } as TaskWithUserName;
      });
    }
  }
}
