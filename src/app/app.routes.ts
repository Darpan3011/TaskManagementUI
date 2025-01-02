import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { AddTaskComponent } from "./admin/add-task/add-task.component";
import { FilterTaskComponent } from "./admin/all-tasks/all-tasks.component";
import { UpdateTheTaskComponent } from "./admin/update-the-task/update-the-task.component";
import { AllTasksComponent } from "./user/all-tasks/all-tasks.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthComponent } from "./auth/auth.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'all-task', pathMatch: 'full' },
            { path: 'new-task', component: AddTaskComponent, title: 'Add Task' },
            { path: 'all-task', component: FilterTaskComponent, title: 'All Tasks' },
            { path: 'update-task/:title', component: UpdateTheTaskComponent, title: 'Update Task' }
        ]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'all-task', pathMatch: 'full' },
            { path: 'all-task', component: AllTasksComponent, title: 'All Tasks' }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '**', // Catch-all route for 404 errors
        component: NotFoundPageComponent
    }
];
