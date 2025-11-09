import { Routes } from '@angular/router';
import { userRouteGuard } from '../route-guards/user-route-guard';

export const routes: Routes = [

    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { 
        path: 'users',
        canActivate: [userRouteGuard],
        children: [
            { path: '', loadComponent: () => import('../components/user-list/user-list').then(c => c.UserListComponent) },
            { path: ':id', loadComponent: () => import('../components/user-detail/user-detail').then(c => c.UserDetailComponent) },
            { path:':id/edit', loadComponent: () => import('../components/user-edit/user-edit').then(c => c.UserEditComponent) }
        ]
    },
    { path: '**', redirectTo: 'users' }

];
