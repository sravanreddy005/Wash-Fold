import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { loadScript } from '../helpers/common';

@Component({
  selector: 'web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebComponent implements OnInit {

  isHomeScreen: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    loadScript('../../assets/web/js/jquery.min.js');
    loadScript('../../assets/web/js/popper.min.js');
    loadScript('../../assets/web/js/bootstrap.min.js');
    loadScript('../../assets/web/js/bundle.js');
    loadScript('../../assets/web/js/scripts.js');
  }

  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }

}
