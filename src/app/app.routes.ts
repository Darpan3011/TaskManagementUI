import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { UnknownComponent } from "./unknown/unknown.component";
import { AddTaskComponent } from "./admin/add-task/add-task.component";
import { FilterTaskComponent } from "./admin/all-tasks/all-tasks.component";
import { UpdateTheTaskComponent } from "./admin/update-the-task/update-the-task.component";
import { AllTasksComponent } from "./user/all-tasks/all-tasks.component";

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'admin', component: AdminComponent, children: [
                    {
                        path: 'new-task', component: AddTaskComponent,
                    },
                    {
                        path: 'all-task', component: FilterTaskComponent
                    },
                    {
                        path: 'update-task/:title', component: UpdateTheTaskComponent
                    }

                ]
            },
            {
                path: 'user', component: UserComponent, children: [
                    {
                        path: 'all-task', component: AllTasksComponent
                    }
                ]
            },
            { path: 'unknown', component: UnknownComponent },
        ]
    },
]