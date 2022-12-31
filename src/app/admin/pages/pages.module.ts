import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SharedModule } from '../../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
// import { EditorModule } from '@tinymce/tinymce-angular';

import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../helpers/table-filter.pipe';
import { SmartFilterPipe } from '../helpers/table-smart-filter.pipe';
import { SafeHtmlPipe } from '../../helpers/safe-html.pipe';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModulesListComponent } from './modules-list/modules-list.component';

import { RolesComponent } from './roles/roles.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { BranchesComponent } from './branches/branches.component';
// import { UsersComponent } from './users/users.component';
// import { SettingsComponent } from './settings/settings.component';
// import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ModulesListComponent,
    FilterPipe,
    SmartFilterPipe,
    SafeHtmlPipe,
    RolesComponent,
    AdminListComponent,
    ProductTypesComponent,
    CategoriesComponent,
    ProductsComponent,
    ProfileComponent,
    BranchesComponent,
    // UsersComponent,
    // SettingsComponent, 
    // NotFoundComponent,       
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgxPaginationModule,
    // EditorModule
  ],  
  providers: [
  ]
})
export class PagesModule {
}
