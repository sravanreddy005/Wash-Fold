import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WebComponent } from './web.component';
import { IndexComponent } from './pages/index/index.component';
import { ResidentialServicesComponent } from './pages/residential-services/residential-services.component';
import { CommercialServicesComponent } from './pages/commercial-services/commercial-services.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
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
      path: 'residential-services',
      component: ResidentialServicesComponent,
    },
    {
      path: 'commercial-services',
      component: CommercialServicesComponent,
    },
    {
      path: 'pricing',
      component: PricingComponent,
    },
    {
      path: 'pricing/:id',
      component: PricingComponent,
    },
    {
      path: 'about-us',
      component: AboutComponent,
    },
    {
      path: 'contact',
      component: ContactComponent,
    },
    {
      path: 'cart',
      component: CartComponent,
    },
    {
      path: 'checkout',
      component: CheckoutComponent,
    },
    {
      path: 'order-status',
      component: OrderStatusComponent,
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
