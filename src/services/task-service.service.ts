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

        return this.httpClient.get('https://localhost:7125/api/Admin/tasks', {
            headers
        });
    }

    editTheTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.put('https://localhost:7125/api/Admin/EditTheTask', task, {
            headers
        });
    }

    addTask(task: Task) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.post('https://localhost:7125/api/Admin/AddTask', task, {
            headers
        });
    }

    getAllUsers() {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get('https://localhost:7125/api/Admin/GetAllUsers', {
            headers
        });
    }

    deleteTheTask(title: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.delete(`https://localhost:7125/api/Admin/DeleteTask/${title}`, {
            headers
        });
    }

    getAllTasksByDueDate(date: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.get(`https://localhost:7125/api/Admin/GetAllTaskByDueDate/${date}`, {
            headers
        });
    }

    getAllTaskByStatus(status: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get(`https://localhost:7125/api/Admin/GetAllTaskByStatus/${status}`, {
            headers
        });
    }

    getTasksByUserID(UserID: string) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get(`https://localhost:7125/api/Admin/GetTasksByUserID/?UserID=${UserID}`, {
            headers
        });
    }

    getTasksByStatusForUser(taskTitle: string, status: number) {
        const token = localStorage.getItem('Token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get(`https://localhost:7125/api/User/tasks/${taskTitle}/status/?newStatus=${status}`, {
            headers
        });
    }

}
