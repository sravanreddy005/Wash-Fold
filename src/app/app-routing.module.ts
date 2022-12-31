import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, 
  { path: 'admin', redirectTo: '/admin/auth/login', pathMatch: 'full' },
  { path: 'admin/auth', redirectTo: '/admin/auth/login', pathMatch: 'full' },
  {
    path: 'admin/auth',
    loadChildren: () => import('./admin/auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: '',
    loadChildren: () => import('./web/web.module')
      .then(m => m.WebModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
