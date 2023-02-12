import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/web/images/icon/logo.png' // Default Logo
  @Input() newsletter: boolean = false; // Default True

  public today: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
