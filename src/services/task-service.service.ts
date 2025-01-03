import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../app/types';

@Injectable({
    providedIn: 'root'
})
export class TaskServiceService {

    private httpClient = inject(HttpClient);

    getAllTasks() {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get('https://localhost:7125/api/Tasks', {
            headers
        });
    }

    editTheTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.put('https://localhost:7125/api/Tasks/edit', task, {
            headers
        });
    }

    addTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.post('https://localhost:7125/api/Tasks/add', task, {
            headers
        });
    }

    getAllUsers() {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get('https://localhost:7125/api/Tasks/users', {
            headers
        });
    }

    deleteTheTask(title: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.delete(`https://localhost:7125/api/Tasks/delete/${title}`, {
            headers
        });
    }

    // getAllTasksByDueDate(date: string) {
    //     const token = localStorage.getItem('Token');
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`
    //     });

    //     return this.httpClient.get(`https://localhost:7125/api/Admin/GetAllTaskByDueDate/${date}`, {
    //         headers
    //     });
    // }

    // getAllTaskByStatus(status: string) {
    //     const token = localStorage.getItem('Token');
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`
    //     });
    //     return this.httpClient.get(`https://localhost:7125/api/Admin/GetAllTaskByStatus/${status}`, {
    //         headers
    //     });
    // }

    getTasksByUserID(UserID: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get(`https://localhost:7125/api/Tasks/tasks/id/?UserID=${UserID}`, {
            headers
        });
    }

    updateTaskStatusUser(taskTitle: string, status: number) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.put(`https://localhost:7125/api/Tasks/tasks/${taskTitle}/status/?newStatus=${status}`, {
            headers
        });
    }

    filterTasks(title: string | null, dueDate: string | null, status: number | null) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        // Prepare query parameters
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (dueDate) params.append('dueDate', dueDate);
        if (status !== null && status !== undefined) params.append('status', status.toString());

        const queryString = params.toString();
        return this.httpClient.get(`https://localhost:7125/api/Tasks/filter?${queryString}`, { headers });
    }


}
