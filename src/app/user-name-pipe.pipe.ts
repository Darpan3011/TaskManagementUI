import { inject, Pipe, PipeTransform } from '@angular/core';
import { TaskServiceService } from '../services/task-service.service';
import { User } from './types';

@Pipe({
  name: 'userNamePipe'
})
export class UserNamePipePipe implements PipeTransform {

  private taskService = inject(TaskServiceService);

  users: User[] | null = [];

  ngOnInit() {

    const s2 = this.taskService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  transform(userId: number): string {
    const user = this.users?.find(u => Number(u.userId) == userId);
    return user ? user.userName : 'Loading...';
  }


}
