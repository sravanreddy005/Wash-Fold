import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { loadScript } from '../../../helpers/common';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // loadScript('../../assets/web/js/jquery.min.js');
    // loadScript('../../assets/web/js/popper.min.js');
    // loadScript('../../assets/web/js/bootstrap.min.js');
    // loadScript('../../assets/web/js/bundle.js');
    // loadScript('../../assets/web/js/scripts.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
