import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';    
import { SharedModule } from '../shared/shared.module';

import { WebComponent } from './web.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    WebComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    WebRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
       
  ]
})
export class WebModule { }
