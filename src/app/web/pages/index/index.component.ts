import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { loadScript } from '../../../helpers/common';
import { environment } from '../../../../environments/environment';
import { ProductService } from '../../services/product.service';
import { WebService } from '../../services/web/web.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  public sliders = [{
    title: 'A laundry service designed for you',
    subTitle: 'We collect, clean, & deliver your laundry & dry cleaning.',
    image: 'assets/web/images/slider/banner1.jpg'
  } ];

  public products: any = [];
  public productCategories: any;
  public serverURL: any = environment.SERVER_URL;

  constructor(
    public productService: ProductService,
    public webService: WebService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

    // Logo
    public logos = [{
      image: 'assets/web/images/logos/9.png',
    }, {
      image: 'assets/web/images/logos/10.png',
    }, {
      image: 'assets/web/images/logos/11.png',
    }, {
      image: 'assets/web/images/logos/12.png',
    }, {
      image: 'assets/web/images/logos/13.png',
    }, {
      image: 'assets/web/images/logos/14.png',
    }, {
      image: 'assets/web/images/logos/15.png',
    }, {
      image: 'assets/web/images/logos/16.png',        
  }]

  getCategories = async() => {
    let resp = await this.webService.getData('getCategories');
    if(resp && resp.data && resp.data.length > 0){
      this.productCategories = resp.data;      
    }
  }

  getLatestProducts = async() => {
    let resp = await this.webService.getData('getLatestProducts');
    let productsList: any = [];
    if(resp && resp.products && resp.products.length > 0){
      resp.products.map((product: any) => {
        let data = {
          "id": product.id,
          "title": product.product_name,
          "description": product.description,
          "product_type": product.product_type.product_type,
          "category": product.category.category_name,
          "category_id": product.category_id,
          "product_type_id": product.product_type_id,
          "price": product.product_price,
          "image": environment.SERVER_URL + '/uploads/products/' + product.product_image,
          "updatedAt": product.updatedAt
        }
        productsList.push(data);
      }); 
      this.products = productsList;
      console.log('this.products', this.products); 
    }    
  }

  
  
}
