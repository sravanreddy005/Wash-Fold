import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from "../../services/product.service";
import { decode } from 'html-entities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products: any = [];
  public currencySymbol: string = decode('&#163;');
  public totalAmount: any;

  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product: any, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product: any, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  handleCheckOutRoute = async() => {
    this.getTotal.subscribe(total => this.totalAmount = total);
    if(this.totalAmount >= 20){
      this.router.navigate(['/', 'checkout']);
    }else{
      scroll(0,0);
      this.toastr.error('Minimum 20Pounds Cart Value for Checkout');
    }    
  }

}
