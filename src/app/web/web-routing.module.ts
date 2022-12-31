import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WebComponent } from './web.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: WebComponent,
  children: [
    {
      path: '',
      component: IndexComponent,
    },
    {
      path: 'index',
      component: IndexComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {
}
