import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { UnknownComponent } from "./unknown/unknown.component";
import { AddTaskComponent } from "./admin/add-task/add-task.component";
import { FilterTaskComponent } from "./admin/all-tasks/all-tasks.component";
import { UpdateTheTaskComponent } from "./admin/update-the-task/update-the-task.component";
import { AllTasksComponent } from "./user/all-tasks/all-tasks.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'all-task', pathMatch: 'full' },
            { path: 'new-task', component: AddTaskComponent },
            { path: 'all-task', component: FilterTaskComponent },
            { path: 'update-task/:title', component: UpdateTheTaskComponent }
        ]
    },
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: '', redirectTo: 'all-task', pathMatch: 'full' },
            { path: 'all-task', component: AllTasksComponent }
        ]
    },
    {
        path: 'unknown',
        component: UnknownComponent
    },
    {
        path: '**', // Catch-all route for 404 errors
        component: NotFoundPageComponent
    }
];
