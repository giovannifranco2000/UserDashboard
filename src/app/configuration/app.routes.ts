import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', loadComponent: () => import('../components/user-list/user-list').then(c => c.UserListComponent) },
    { 
        path: 'users/:id',
        loadComponent: () => import('../components/user-detail/user-detail').then(c => c.UserDetailComponent),
        children: [
            { path:'edit', loadComponent: () => import('../components/user-edit/user-edit').then(c => c.UserEditComponent) }
        ]
    },
    { path: '**', redirectTo: 'users' }

];
