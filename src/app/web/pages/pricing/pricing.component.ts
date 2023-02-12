import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { WebService } from '../../services/web/web.service';
import { environment } from '../../../../environments/environment';
import { CategorySlider } from '../../elements/slider';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {

  public productTypes: any = [];
  public products: any = [];
  public filteredProducts: any = [];
  public productCategories: any[] = [];
  public activeProductType!: any;
  public activeCategory!: any;
  public CategorySliderConfig: any = CategorySlider;
  public serverURL: any = environment.SERVER_URL;
  public categoryID: any;

  constructor(
    public productService: ProductService,
    public webService: WebService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.categoryID = this.route.snapshot.paramMap.get('id');
    this.getCategories();
    this.getProductTypes();
  }

  getProductTypes = async() => {
    let resp = await this.webService.getData('getProductTypes');
    if(resp && resp.data && resp.data.length > 0){
      this.productTypes = resp.data;
      this.activeProductType = this.productTypes[0].id;
    }
  }

  getCategories = async() => {
    let resp = await this.webService.getData('getCategories');
    if(resp && resp.data && resp.data.length > 0){
      this.productCategories = resp.data;
      this.activeCategory = this.categoryID ? parseInt(this.categoryID) : this.productCategories[0].id;
      this.getProducts();
    }
  }

  getProducts = async() => {
    let resp = await this.webService.getData('getProducts');
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
      this.filterProducts();           
    }    
  }

  filterProducts = () => {
    let productTypeID = this.activeProductType;
    let categoryID = this.activeCategory;    
    let filteredProducts = this.products.filter((product: any) => {
      return product.product_type_id === productTypeID && product.category_id === categoryID;
    });
    this.filteredProducts = filteredProducts;
  }

  handleCategoryChange = (category: any) => {
    this.activeCategory = category;
    this.filterProducts();
  }

  handleProductTypeChange = (productType: any) => {
    this.activeProductType = productType;
    this.filterProducts();
  }

}
