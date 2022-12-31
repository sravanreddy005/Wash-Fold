import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { alphaRegx, mobileRegx, addressRegx } from '../../helpers/regExp';
import { deleteConfirmAlert, changeConfirmAlert, successAlert, errorAlert } from '../../helpers/sweetalert';
import { AuthenticateService } from '../../services/authentication/authenticate.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  addForm!: FormGroup;
  updateForm!: FormGroup;
  showModal! : boolean;
  submitted = false;
  editBtnDisable = false;
  adminsList: any;
  roles: any;
  userAccess = {view: true, edit: false, delete: false};
  page: number = 1;
  pageSize: number = 25;
  totalCount: number = 0;
  pageSizes = ['25', '50', '100', '200'];
  currentUserData: any;
  branchesList: any;


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
    private dialogService: NbDialogService,
    private authenticateService: AuthenticateService
  ) { }


  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('users');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }

    this.currentUserData = this.authenticateService.currentUserValue;
    

    this.addForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      branch_id: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.pattern(alphaRegx), Validators.minLength(3), Validators.maxLength(30)]],
      last_name: ['', [Validators.pattern(alphaRegx), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.required, Validators.pattern(mobileRegx)]],
      address: ['', [Validators.pattern(addressRegx), Validators.minLength(10), Validators.maxLength(250)]]
    });
    this.updateForm = this.formBuilder.group({
      admin_id: ['', [Validators.required]],
      role: ['', [Validators.required]],
      branch_id: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.pattern(alphaRegx), Validators.minLength(3), Validators.maxLength(30)]],
      last_name: ['', [Validators.pattern(alphaRegx), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.required, Validators.pattern(mobileRegx)]],
      address: ['', [Validators.pattern(addressRegx), Validators.minLength(10), Validators.maxLength(250)]]
    });

    this.getUsersList();
    this.getRoles();
    this.getBranchesList();
  }

  changePageSize = (event: any) => {    
    this.pageSize = event.target.value;
  }

  openModal(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: '',
        closeOnBackdropClick: false,
      });
  }

  openActionDropDown = (i: any) => {       
    let dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    } 
    document.getElementById("actionDropDown-" + i).classList.toggle("show");
  }

  getUsersList = async() => {
    try {
      const adminsResp = await this.adminService.getData('getUsersList');          
      if(adminsResp && adminsResp.responseCode === 1){
        this.adminsList = adminsResp.adminsList;
        this.totalCount = (adminsResp.adminsList).length;
      }
    } catch (error) {
      this.adminsList = '';
    }    
  }

  getRoles = async() => {
    const rolesResp = await this.adminService.getData('getRoles');
    if(rolesResp && rolesResp.responseCode === 1){
      this.roles = rolesResp.roles;
    }
  }

  getBranchesList = async() => {
    try {
      let resp = await this.adminService.getData('getBranches');          
      if(resp && resp.responseCode === 1){
        this.branchesList = resp.branchesList;
      }
    } catch (error) {
      this.branchesList = {};
    }    
  }

  edit = (data: any, modalVal: any) => {
    const updateData = {
      admin_id: data.id,
      role: data.role_id,
      branch_id: data.branch_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_number: data.mobile_number,
      address: data.address
    }
    this.updateForm.setValue(updateData);
    this.openModal(modalVal);
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
        const addResp = await this.adminService.addOrUpdateData('createUser', this.addForm.value);
        if(addResp && addResp.responseCode === 1){
          this.getUsersList();
          await successAlert("User added successfully");
        }else if(addResp && addResp.responseCode === 0){
          await errorAlert(addResp.message);
        }else{
          await errorAlert("User adding has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;
    this.addForm.reset();
    document.getElementById("close_add_modal")?.click()
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
        const updateResp = await this.adminService.addOrUpdateData('updateUser', this.updateForm.value);
        if(updateResp && updateResp.responseCode === 1){
          this.getUsersList();
          await successAlert("Details updated successfully")
        }else if(updateResp && updateResp.responseCode === 0){
          await errorAlert(updateResp.message);
        }else{
          await errorAlert("Details updating has failed ! Please try again");
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
    this.submitted = false;
    this.updateForm.reset();
    document.getElementById("close_edit_modal")?.click()
  }

  changeStatus = async (data: any) => {
    try {
      if (this.userAccess.edit) {
        const currentStatus = data.active;
        const status = (currentStatus) ? 'inactive' : 'active';
        if (await changeConfirmAlert(`Want to ${status} this user account`)) {
          const statusResp = await this.adminService.addOrUpdateData('updateUserStatus', { id: data.id, current_status: currentStatus });
          if (statusResp && statusResp.responseCode === 1) {
            this.getUsersList();
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

  generatePassword = async (id: any) => {
    try {
      if (this.userAccess.edit) {
        if (await changeConfirmAlert(`Want to generate temporary password for this user account`)) {
          const resp = await this.adminService.addOrUpdateData('generateUserPassword', { id: id });
          if (resp && resp.responseCode === 1) {
            await successAlert('Temporary password has generated successfully and sent to registered mobile number.');
          } else {
            await errorAlert("Password generating has failed ! Please try again");
          }
        }
      }
    } catch (error) {
      await errorAlert("Password generating has failed ! Please try again");
    }    
  }

  delete = async(id: String) => {
    try {
      if(this.userAccess.delete){
        if(await deleteConfirmAlert('Want to delete this user')){
          const deleteResp = await this.adminService.deleteData('deleteUser', id);
          if(deleteResp && deleteResp.responseCode === 1){
            this.getUsersList();
            await successAlert("Details deleted successfully")
          }else{
            await errorAlert("Details deleting has failed ! Please try again")
          }
        }
      }else{
        await errorAlert("Access Forbidden ! Please contact administrator");
      }
    } catch (error) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
  }

}