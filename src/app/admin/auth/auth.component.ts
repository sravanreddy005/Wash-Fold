import { Component, OnInit, ViewEncapsulation, ElementRef  } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['auth.component.scss'],
  template: `<app-loader></app-loader>
  <router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None, 
})
export class AuthComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) {}
  
  ngOnInit(): void {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/bootstrap.bundle.min.js";
    this.elementRef.nativeElement.appendChild(s);      
  }

}
