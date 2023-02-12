import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { floatRegx, alnumSpecialRegx } from '../../../helpers/regExp';
import { deleteConfirmAlert, changeConfirmAlert, successAlert, errorAlert } from '../../helpers/sweetalert';
import { AuthenticateService } from '../../services/authentication/authenticate.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  changeStatusForm!: FormGroup;
  ordersList: any;
  userAccess = {view: true, edit: false, delete: false};
  page: number = 1;
  pageSize: number = 25;
  totalCount: number = 0;
  pageSizes = ['25', '50', '100', '200'];
  currentUserData: any;
  search_string1: any;
  search_string2: any;
  search_string3: any;
  search_string4: any;
  serverURL: any = environment.SERVER_URL;
  showOrderDetails: boolean = false;
  orderDetails: any = {};
  orderStatus: any;
  submitted: boolean = false;
  statusClassConfig: any = {
    'PENDING': 'bg-warning',
    'OUT FOR PICKUP': 'bg-info',
    'IN PROCESS': 'bg-secondary',
    'OUT FOR DELIVERY': 'bg-primary',
    'DELIVERED': 'bg-success',
  }

  constructor(
    private adminService: AdminService,
    private accessService: AccessService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('orders');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }

    this.changeStatusForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.getOrders();
  }

  get form() { return this.changeStatusForm.controls; }

  changePageSize = (event: any) => {    
    this.pageSize = event.target.value;
  }

  getOrders = async() => {
    const resp = await this.adminService.getData('getOrders');          
    if(resp && resp.responseCode === 1 && resp.list){
      this.ordersList = resp.list;
      this.totalCount = resp.list.length;
    }    
  }

  viewOrderDetails = (data: any) => {
    this.orderDetails = data;
    this.showOrderDetails = true;
  }

  changeOrderStatus = (data: any) => {
    console.log('data', data);
    
    this.changeStatusForm.setValue({
      id: data.id,
      status: data.order_status
    });
  }

  back = () => {
    this.showOrderDetails = false;
  }

  changeStatusFormSubmit = async () => {
    try {
      this.submitted = true;
      if (this.userAccess.edit) {
        if (this.changeStatusForm.invalid) {
          this.submitted = false;
            return;
        }
        if (await changeConfirmAlert(`Want to update this order status`)) {
          const resp = await this.adminService.addOrUpdateData('updateOrdersStatus', this.changeStatusForm.value);
          if (resp && resp.responseCode === 1) {
            this.getOrders();
            await successAlert('Status updated successfully');
          } else {
            await errorAlert("Status updating has failed ! Please try again");
          }
        }
      }
    } catch (error) {
      await errorAlert("Status updating has failed ! Please try again");
    }    
    this.submitted = false;
    document.getElementById("close_edit_modal")?.click();
  }

  delete = async(id: String) => {
    try {
      if(this.userAccess.delete){
        if(await deleteConfirmAlert('Want to delete this product')){
          const resp = await this.adminService.deleteData('deleteProducts', id);
          if(resp && resp.responseCode === 1){
            this.getOrders();
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