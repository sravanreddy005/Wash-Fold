import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { RolesComponent } from './roles/roles.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { BranchesComponent } from './branches/branches.component';

import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'modules-list',
      component: ModulesListComponent,
    },
    {
      path: 'roles',
      component: RolesComponent,
    },
    {
      path: 'admin-list',
      component: AdminListComponent,
    },
    {
      path: 'product-types',
      component: ProductTypesComponent,
    },
    {
      path: 'categories',
      component: CategoriesComponent,
    },
    {
      path: 'products',
      component: ProductsComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },        
    {
      path: 'branches',
      component: BranchesComponent,
    },
    // {
    //   path: 'access-denied',
    //   component: AccessDeniedComponent,
    // },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
