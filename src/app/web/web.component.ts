import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebComponent implements OnInit {

  isHomeScreen: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // const s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

}
