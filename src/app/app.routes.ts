import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            
            {
                path: 'register', loadComponent: () => import('./components/user/register/register.component')
                    .then(c => c.RegisterComponent),
            }
        ]
    },
];
