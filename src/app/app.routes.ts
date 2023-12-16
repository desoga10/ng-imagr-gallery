import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./component/dashboard/dashboard.component').then(
        (com) => com.DashboardComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./component/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./component/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./component/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
];
