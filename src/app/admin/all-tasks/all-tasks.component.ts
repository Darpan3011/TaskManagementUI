import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskServiceService } from '../../../services/task-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Task, TaskWithUserName, User } from '../../types';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  form = new FormGroup({
    title: new FormControl<string | null>(null),
    date: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null),
  });

  searchtext = '';
  errorMessage: string | null = null;
  tasks: TaskWithUserName[] | null = [];

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


  onSearchTask() {
    console.log(this.form.value);


    const title = this.form.value.title ? this.form.value.title : null;
    const date = this.form.value.date ? this.form.value.date : null;
    const status = this.form.value.status ? this.form.value.status : null;

    this.taskService.filterTasks(title, date, status).subscribe({
      next: (data: any) => {
        this.tasks = data;
      },
      error: (err) => {
        this.tasks = null;
      }
    });
  }




}
