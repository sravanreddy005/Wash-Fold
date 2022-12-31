import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AutoFocusDirective } from '../helpers/autofocus.directive';
import { NumberDirective } from '../helpers/numbers-only.directive';
import { TrimDirective } from '../helpers/trim-string.directive';
import { CapitalStringDirective } from '../helpers/capital-string.directive';
// import { ToasterService } from '../services/toaster/toaster.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        AutoFocusDirective,
        NumberDirective,
        LoaderComponent,
        TrimDirective,
        CapitalStringDirective
    ],
    declarations: [
        AutoFocusDirective,
        NumberDirective,
        LoaderComponent,
        TrimDirective,
        CapitalStringDirective
    ],
    providers: [
        // ToasterService,
    ]
  })
  export class SharedModule {}