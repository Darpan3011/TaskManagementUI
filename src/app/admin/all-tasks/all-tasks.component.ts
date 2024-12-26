import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { Task, User } from '../../types';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  imports: [FormsModule, NgClass, RouterLink, RouterOutlet],
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class FilterTaskComponent implements OnInit {
  private taskService = inject(TaskServiceService);

  searchtext = '';
  tasks$ = this.taskService.getAllTasks();
  alltasks: Task[] | null = null;

  get filteredTasks() {
    return this.alltasks?.filter((task: any) =>
      task.title.toLowerCase().includes(this.searchtext.toLowerCase())
    );
  }

  users: User[] | null = [];
  private destroy = inject(DestroyRef);


  ngOnInit() {

    // const s2 = this.taskService.getAllUsers().subscribe({
    //   next: (data: any) => {
    //     this.users = data;
    //     console.log('Users loaded:', this.users);
    //   },
    //   error: (err) => console.error('Error loading tasks:', err)
    // });


    const s1 = this.tasks$.subscribe({
      next: (data: any) => {
        this.alltasks = data;
      },
      error: (err) => console.error('Error loading tasks:', err)
    });



    this.destroy.onDestroy(() => {
      // s2.unsubscribe();
      s1.unsubscribe();
    })
  }

  deleteTask(title: string) {
    this.taskService.deleteTheTask(title).subscribe();
  }

}
