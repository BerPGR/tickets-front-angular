import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', component: Layout, children: [
    {path: 'new', loadComponent: () => import('./pages/newticket/newtickt.component').then((m) => m.NewTicketComponent)}
  ]},
  {
    path: "login", loadComponent: () => import("./pages/auth/auth").then((c) => c.Auth)
  }
];
