import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { alphaRegx, mobileRegx, addressRegx, alnumSpecialRegx, pincodeRegx, urlRegx, emailRegx } from '../../../helpers/regExp';
import { deleteConfirmAlert, changeConfirmAlert, successAlert, errorAlert } from '../../helpers/sweetalert';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {

  addForm!: FormGroup;
  updateForm!: FormGroup;
  showModal! : boolean;
  submitted = false;
  list: any;
  roles: any;
  userAccess = {view: true, edit: false, delete: false};
  page: number = 1;
  pageSize: number = 25;
  totalCount: number = 0;
  search_string: string = '';
  pageSizes = ['25', '50', '100', '200'];
  displayMap: Boolean = false;
  search_string1: any;
  search_string2: any;
  search_string3: any;
  search_string4: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
  ) { }


  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('branches');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }    

    this.addForm = this.formBuilder.group({
      branch_name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.minLength(3), Validators.maxLength(100)]],
      branch_email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      branch_mobile_number: ['', [Validators.required, Validators.pattern(mobileRegx)]],      
      pincode: ['', [Validators.required, Validators.pattern(pincodeRegx)]],
      address: ['', [Validators.required, Validators.pattern(addressRegx), Validators.minLength(5), Validators.maxLength(100)]],
      google_map_link: ['', [Validators.pattern(urlRegx)]],
    });
    this.updateForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      branch_name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.minLength(3), Validators.maxLength(100)]],
      branch_email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      branch_mobile_number: ['', [Validators.required, Validators.pattern(mobileRegx)]],      
      pincode: ['', [Validators.required, Validators.pattern(pincodeRegx)]],
      address: ['', [Validators.required, Validators.pattern(addressRegx), Validators.minLength(5), Validators.maxLength(100)]],
      google_map_link: ['', [Validators.pattern(urlRegx)]],
    });

    this.getBranchesList();
  }

  changePageSize = (event: any) => {    
    this.pageSize = event.target.value;
  }

  getBranchesList = async() => {
    try {
      let resp = await this.adminService.getData('getBranches');  
      if(resp && resp.responseCode === 1 && resp.list){
        this.list = resp.list;
        this.totalCount = (resp.list).length;
      }
    } catch (error) {
      this.list = {};
    }    
  }

  getPincodeDetails = async(event: any) => {
    try {
      if(event.target.value && event.target.value.length === 6){
        let pincodeDetails = await this.adminService.getPincodeDetails(event.target.value, 'UK'); 
        if(pincodeDetails && pincodeDetails.country){
          this.addForm.controls['city'].setValue(pincodeDetails.city);
          this.addForm.controls['state'].setValue(pincodeDetails.state);
        }
      }else{
        this.addForm.controls['city'].setValue('');
        this.addForm.controls['state'].setValue('');
      }
    } catch (error) {
      this.addForm.controls['city'].setValue('');
      this.addForm.controls['state'].setValue('');
    }    
  }

  loadGoogleMap = (id: any) => {
    let mapURL = (id && id === 'addform-map') ? this.addForm.value.google_map_link : this.updateForm.value.google_map_link;
    if(mapURL && urlRegx.test(mapURL)){
      console.log('mapURL', mapURL);
      
      this.displayMap = true;
      let iframe = document.createElement('iframe');
      iframe.src = mapURL;
      iframe.width = '100%';
      iframe.height = '300px';
      (<HTMLBodyElement>document.getElementById(`${id}`)).innerHTML = '';
      (<HTMLBodyElement>document.getElementById(`${id}`)).appendChild(iframe);      
    }
  }

  edit = (data: any) => {
    const updateData = {
      id: data.id,
      branch_name: data.name,
      branch_email: data.email,
      branch_mobile_number: data.mobile_number,
      address: data.address,
      pincode: data.pincode,
      google_map_link: data.google_map_link ? data.google_map_link : null,
    }
    this.updateForm.setValue(updateData);
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
        const addResp = await this.adminService.addOrUpdateData('addBranch', this.addForm.value);
        if(addResp && addResp.responseCode === 1){
          this.getBranchesList();
          await successAlert("Branch added successfully");
          this.addForm.reset();
          document.getElementById("close_add_modal")?.click();
        }else if(addResp && addResp.responseCode === 0){
          await errorAlert(addResp.message);
        }else{
          await errorAlert("Branch adding has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;  
    this.addForm.reset();
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
        const updateResp = await this.adminService.addOrUpdateData('updateBranch', this.updateForm.value);
        if(updateResp && updateResp.responseCode === 1){
          this.getBranchesList();
          await successAlert("Details updated successfully")
        }else if(updateResp && updateResp.responseCode === 0){
          await errorAlert(updateResp.message);
        }else{
          await errorAlert("Details updating has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;
    this.updateForm.reset();
    document.getElementById("close_edit_modal")?.click()
  }

  changeStatus = async (data: any) => {
    try {
      if (this.userAccess.edit && data.branch_type !== 'Head Office') {
        const currentStatus = data.active;
        const status = (currentStatus) ? 'inactive' : 'active';
        if (await changeConfirmAlert(`Want to ${status} this branch`)) {
          const statusResp = await this.adminService.addOrUpdateData('updateBranchStatus', { id: data.id, current_status: currentStatus });
          if (statusResp && statusResp.responseCode === 1) {
            this.getBranchesList();
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
        if(await deleteConfirmAlert('Want to delete this branch')){
          const deleteResp = await this.adminService.deleteData('deleteBranch' , id);
          if(deleteResp && deleteResp.responseCode === 1){
            this.getBranchesList();
            await successAlert("Branch deleted successfully")
          }else{
            await errorAlert("Branch deleting has failed ! Please try again")
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
