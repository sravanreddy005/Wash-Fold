import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { WebRoutingModule } from './web-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';   
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { SharedModule } from '../shared/shared.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { WebComponent } from './web.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { NotFoundComponent } from './components/not-found/not-found.component';

// Layout Box
import { LayoutBoxComponent } from './components/layout-box/layout-box.component';

// Tap To Top
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';

import { SliderComponent } from './elements/slider/slider.component';
import { QuickViewComponent } from './elements/modal/quick-view/quick-view.component';
import { CartModalComponent } from './elements/modal/cart-modal/cart-modal.component';
import { LogoComponent } from './elements/logo/logo.component';

//Pages
import { IndexComponent } from './pages/index/index.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { ResidentialServicesComponent } from './pages/residential-services/residential-services.component';
import { CommercialServicesComponent } from './pages/commercial-services/commercial-services.component';


@NgModule({
  declarations: [
    WebComponent,
    HeaderComponent,
    FooterComponent,
    LayoutBoxComponent,
    TapToTopComponent,    
    SliderComponent,
    QuickViewComponent,
    CartModalComponent,
    LogoComponent,
    ProductBoxComponent,
    IndexComponent,
    NotFoundComponent,
    CartComponent,
    CheckoutComponent,
    AboutComponent,
    ContactComponent,
    TestimonialsComponent,
    PricingComponent,
    OrderStatusComponent,
    ResidentialServicesComponent,
    CommercialServicesComponent
  ],
  imports: [
    WebRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    
    FormsModule,
    NgSelectModule,
    NgbModule,
    LoadingBarHttpClientModule, 
    LoadingBarRouterModule,  
    ToastrModule.forRoot(),
    LazyLoadImageModule,
    CarouselModule
  ]
})
export class WebModule { }
