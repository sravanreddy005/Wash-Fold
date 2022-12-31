import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { floatRegx, alnumSpecialRegx } from '../../../helpers/regExp';
import { deleteConfirmAlert, changeConfirmAlert, successAlert, errorAlert } from '../../helpers/sweetalert';
import { AuthenticateService } from '../../services/authentication/authenticate.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  addForm!: FormGroup;
  updateForm!: FormGroup;
  showModal! : boolean;
  submitted = false;
  editBtnDisable = false;
  productTypes: any;
  categories: any;
  productsList: any;
  roles: any;
  userAccess = {view: true, edit: false, delete: false};
  page: number = 1;
  pageSize: number = 25;
  totalCount: number = 0;
  pageSizes = ['25', '50', '100', '200'];
  currentUserData: any;
  branchesList: any;
  search_string1: any;
  search_string2: any;
  search_string3: any;
  search_string4: any;
  selectedFile: any;
  serverURL: any = environment.SERVER_URL;
  productImage: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('products');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }

    this.currentUserData = this.authenticateService.currentAdminUserValue;

    this.addForm = this.formBuilder.group({
      product_type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      product_name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.maxLength(100)]],
      product_price: ['', [Validators.required, Validators.pattern(floatRegx)]],
    });
    this.updateForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      product_type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      product_name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.maxLength(100)]],
      product_price: ['', [Validators.required, Validators.pattern(floatRegx)]],
    });

    this.getProductTypes();
    this.getCategories();
    this.getProducts();
  }

  changePageSize = (event: any) => {    
    this.pageSize = event.target.value;
  }

  getProductTypes = async() => {
    const resp = await this.adminService.getData('getProductTypes');          
    if(resp && resp.responseCode === 1 && resp.data){
      this.productTypes = resp.data;
    }    
  }

  getCategories = async() => {
    const resp = await this.adminService.getData('getCategories');          
    if(resp && resp.responseCode === 1 && resp.data){
      this.categories = resp.data;
    }    
  }

  getProducts = async() => {
    try {
      const resp = await this.adminService.getData('getProducts'); 
      if(resp && resp.responseCode === 1 && resp.products){
        this.productsList = resp.products;
        this.totalCount = (resp.products).length;
      }
    } catch (error) {
      this.productsList = '';
    }    
  }

  onFileSelect = async(event: any) => {
    this.selectedFile = event.target.files;
  }

  edit = (data: any) => {
    const updateData = {
      id: data.id,
      product_type: data.product_type_id,
      category: data.category_id,
      product_name: data.product_name,
      product_price: data.product_price,
    }
    this.updateForm.setValue(updateData);
    this.productImage = data.product_image;
  }

  get form() { return this.addForm.controls; }
  get editForm() { return this.updateForm.controls; }

  addFormSubmit = async() => {
    try {
      if(this.userAccess.edit){
        this.submitted = true;
        // stop here if form is invalid
        if (this.addForm.invalid) {
          this.submitted = false;
            return;
        }
        let formData = new FormData;
        for (const key of Object.keys(this.addForm.value)) {
          let value = this.addForm.value[key];
          formData.append(key, value);
        }
        if(this.selectedFile && this.selectedFile.length > 0){
          formData.append('image_path', 'products');
          formData.append("product_image", this.selectedFile[0], this.selectedFile[0]['name']);
        }
        const resp = await this.adminService.addOrUpdateData('addProducts', formData);
        if(resp && resp.responseCode === 1){
          this.getProducts();
          await successAlert("Product added successfully");
        }else if(resp && resp.responseCode === 0){
          await errorAlert(resp.message);
        }else{
          await errorAlert("Product adding has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;
    this.addForm.reset();
    this.selectedFile = ''; 
    (<HTMLInputElement>document.getElementById('product_image_add')).value = '';   
    document.getElementById("close_add_modal")?.click();
  }

  updateFormSubmit = async() => {
    try {
      if(this.userAccess.edit){
        this.submitted = true;
        // stop here if form is invalid
        if (this.updateForm.invalid) {
          this.submitted = false;
            return;
        }
        let formData = new FormData;
        for (const key of Object.keys(this.updateForm.value)) {
          let value = this.updateForm.value[key];
          formData.append(key, value);
        }
        if(this.selectedFile && this.selectedFile.length > 0){
          formData.append('image_path', 'products');
          formData.append("product_image", this.selectedFile[0], this.selectedFile[0]['name']);
        }
        const resp = await this.adminService.addOrUpdateData('updateProducts', formData);
        if(resp && resp.responseCode === 1){
          this.getProducts();
          await successAlert("Product updated successfully")
        }else if(resp && resp.responseCode === 0){
          await errorAlert(resp.message);
        }else{
          await errorAlert("Product updating has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;
    this.updateForm.reset();
    this.selectedFile = '';
    (<HTMLInputElement>document.getElementById('product_image_update')).value = '';
    document.getElementById("close_edit_modal")?.click()
  }

  changeStatus = async (data: any) => {
    try {
      if (this.userAccess.edit) {
        const currentStatus = data.active;
        const status = (currentStatus) ? 'inactive' : 'active';
        if (await changeConfirmAlert(`Want to ${status} this product`)) {
          const resp = await this.adminService.addOrUpdateData('updateProductStatus', { id: data.id, current_status: currentStatus });
          if (resp && resp.responseCode === 1) {
            this.getProducts();
            await successAlert('Status updated successfully');
          } else {
            await errorAlert("Status updating has failed ! Please try again");
          }
        }
      }
    } catch (error) {
      await errorAlert("Status updating has failed ! Please try again");
    }    
  }

  delete = async(id: String) => {
    try {
      if(this.userAccess.delete){
        if(await deleteConfirmAlert('Want to delete this product')){
          const resp = await this.adminService.deleteData('deleteProducts', id);
          if(resp && resp.responseCode === 1){
            this.getProducts();
            await successAlert("Product deleted successfully")
          }else{
            await errorAlert("Product deleting has failed ! Please try again")
          }
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
  }

}
