import { Component, OnInit, ViewEncapsulation, ElementRef  } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: 'pages.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit{

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
