import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../elements/modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../elements/modal/cart-modal/cart-modal.component";
import { ProductService } from "../../services/product.service";
import { decode } from 'html-entities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() product: any;
  @Input() currency: any = decode('&#163;');
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  
  @ViewChild("quickView") QuickView!: QuickViewComponent;
  @ViewChild("cartModal") CartModal!: CartModalComponent;

  public ImageSrc : string = 'assets/web/images/product/placeholder.jpg';

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {    
    if(this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
  }

  addToCart(product: any) {
    this.productService.addToCart(product); 
    scroll(0,0);   
    this.toastr.success('Added To The Basket');
  }

  addToWishlist(product: any) {
    // this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    // this.productService.addToCompare(product);
  }

  // Increament
  increment(product: any, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product: any, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

}
