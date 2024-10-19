import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
       {
        path:'login',
        loadComponent:()=>
            import('./features/account/login/login.component').then(
                (m)=>m.LoginComponent
            ),
       }
       ,
       {
        path:'register',
        loadComponent:()=>
            import('./features/account/register/register.component').then(
                (m)=>m.RegisterComponent
            ),
       },
       {
        path:'task',
        loadComponent:()=>
            import('./features/task/task.component').then(
                (m)=>m.TaskComponent
            ),
             canActivate: [authGuard],
       },
       {
         path: '**',
         redirectTo: 'login',
       },

];
