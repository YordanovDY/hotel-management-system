import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoubleLoginGuard } from './guards/double-login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [DoubleLoginGuard] },
    {
        path: 'dashboard', canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },

            {
                path: 'register', loadComponent: () => import('./components/user/register/register.component')
                    .then(c => c.RegisterComponent),
            },

            {
                path: 'rooms-management',
                children: [
                    {
                        path: '', loadComponent: () => import('./components/room/rooms/rooms.component')
                            .then(c => c.RoomsComponent),
                    },

                    {
                        path: 'create-room', loadComponent: () => import('./components/room/create-room/create-room.component')
                            .then(c => c.CreateRoomComponent),
                    },

                    {
                        path: 'edit-room/:roomId', loadComponent: () => import('./components/room/edit-room/edit-room.component')
                            .then(c => c.EditRoomComponent),
                    },
                ]
            }
        ]
    },
];
