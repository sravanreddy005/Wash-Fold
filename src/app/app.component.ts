import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import 'core-js/actual';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admindashboard';
  constructor(
    private elementRef: ElementRef,  public  _router: Router
    ) { }

  ngOnInit() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
