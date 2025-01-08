import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../app/types';

@Injectable({
    providedIn: 'root'
})
export class TaskServiceService {

    private httpClient = inject(HttpClient);

    private readonly BASE_URL = "https://localhost:7125";

    getAllTasks() {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get(`${this.BASE_URL}/api/Tasks`, {
            headers
        });
    }

    editTheTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.put(`${this.BASE_URL}/api/Tasks/edit`, task, {
            headers
        });
    }

    addTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.post(`${this.BASE_URL}/api/Tasks/add`, task, {
            headers
        });
    }

    getAllUsers() {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get(`${this.BASE_URL}/api/Tasks/users`, {
            headers
        });
    }

    deleteTheTask(title: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.delete(`${this.BASE_URL}/api/Tasks/delete/${title}`, {
            headers
        });
    }

    // getAllTasksByDueDate(date: string) {
    //     const token = localStorage.getItem('Token');
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`
    //     });

    //     return this.httpClient.get(`${BASE_URL}/api/Admin/GetAllTaskByDueDate/${date}`, {
    //         headers
    //     });
    // }

    // getAllTaskByStatus(status: string) {
    //     const token = localStorage.getItem('Token');
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`
    //     });
    //     return this.httpClient.get(`${BASE_URL}/api/Admin/GetAllTaskByStatus/${status}`, {
    //         headers
    //     });
    // }

    getTasksByUserID(UserID: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get(`${this.BASE_URL}/api/Tasks/tasks/id/?UserID=${UserID}`, {
            headers
        });
    }

    updateTaskStatusUser(taskTitle: string, status: number) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.put(`${this.BASE_URL}/api/Tasks/tasks/${taskTitle}/status/?newStatus=${status}`, {
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
        return this.httpClient.get(`${this.BASE_URL}/api/Tasks/filter?${queryString}`, { headers });
    }


}
