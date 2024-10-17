import { Routes } from '@angular/router';

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
            import('./features/contact/contact.component').then(
                (m)=>m.ContactComponent
            ),
       }

];
