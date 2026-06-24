import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: Layout, children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent), canActivate: [authGuard] },
    { path: 'new', loadComponent: () => import('./pages/newticket/newtickt.component').then((m) => m.NewTicketComponent), canActivate: [authGuard] }
    ]
  },
  {
    path: "login", loadComponent: () => import("./pages/auth/auth").then((c) => c.Auth)
  }
];
