import { Component, OnInit, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../services/product.service";
import { decode } from 'html-entities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input() class: string = 'header-gym';
  @Input() themeLogo: string = 'assets/web/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = true; // Default false

  public stick: boolean = false;
  public mainMenuToggle: boolean = false;
  public products: any = [];
  public currencySymbol: string = decode('&#163;');

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  handleMainMenuToggle = (): void => {
    this.mainMenuToggle = !this.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item: any) {
    item.active = !item.active;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItemFromCart(product: any) {
    this.productService.removeCartItem(product);
  }

}
