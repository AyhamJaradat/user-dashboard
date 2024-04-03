import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsViewComponent } from './components/user-details-view/user-details-view.component';

export const routes: Routes = [
    {
        path:"",
        component: DashboardComponent
    },
    {
        path: "user/:id",
        component: UserDetailsViewComponent
    }
];
