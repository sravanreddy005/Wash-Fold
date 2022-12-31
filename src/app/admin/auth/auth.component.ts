import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['auth.component.scss'],
  template: `<app-loader></app-loader>
  <router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None, 
})
export class AuthComponent implements OnInit {

  ngOnInit(): void {

  }

}
