import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { alphaRegx } from '../../../helpers/regExp';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { successAlert, errorAlert } from '../../helpers/sweetalert';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public addRoleForm!: FormGroup;
  public editRoleForm!: FormGroup;
  public showAddRole = false;
  public showEditRole = false;
  public rolesList: any = [];
  public modules: any = [];
  public modulesList: any;
  public addBtnDisable = false;
  public roleTypes: any;

  @ViewChildren('myItem') item: any;
  selectedIds: any = [];
  data: any;
  userAccess = {view: true, edit: false, delete: false};

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService
  ) { }

  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('roles');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }
    this.getRoleTypes();
    if (!this.showAddRole && !this.showEditRole) {
      this.getRoles();
    }
  }

  back = () => {
    this.showEditRole = false;
    this.showAddRole = false;
    this.addBtnDisable = false;
  }

  addRole = async () => {
    this.modules = await this.getModules();
    this.addRoleForm = this.formBuilder.group({
      role_name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(alphaRegx), Validators.maxLength(30)]],
      role_type: ['Super-Admin', [Validators.required]],
    });        

    this.modules.map((module: any, index: any)=>{
      this.modules[index].check = true;
      this.selectedIds.push({ module_val: module.module_value, checked: true });
      this.selectedIds[this.selectedIds.length - 1]['view'] = true;
      this.selectedIds[this.selectedIds.length - 1]['edit'] = true;
      this.selectedIds[this.selectedIds.length - 1]['delete'] = true;
    })
    this.showEditRole = false;
    this.showAddRole = true;
  }

  editRole = async(roleData: any) => {
    this.modulesList = await this.getModules();
    this.editRoleForm = this.formBuilder.group({
      role_id: ['', [Validators.required]],
      role_name: ['', [Validators.required, Validators.pattern(alphaRegx), Validators.minLength(5), Validators.maxLength(30)]],
      role_type: ['', [Validators.required]],
    });        
    const accessModules = Array.isArray(roleData.access_modules) ? roleData.access_modules : JSON.parse(roleData.access_modules);
    this.selectedIds = [];
    this.modulesList.map((module: any, index: any)=>{
      accessModules.map((value: any)=>{
        if(module.module_value === value.module_val && value.checked === true){
          this.modulesList[index].check = true;
          this.selectedIds.push({ module_val: value.module_val, checked: true });
          this.selectedIds[this.selectedIds.length - 1]['view'] = value.view;
          this.selectedIds[this.selectedIds.length - 1]['edit'] = value.edit;
          this.selectedIds[this.selectedIds.length - 1]['delete'] = value.delete;
        }      
      });      
    });
    this.editRoleForm.setValue({
      role_id: roleData.id,
      role_name: roleData.role_name,
      role_type: roleData.role_type,
    });
    this.showAddRole = false;
    this.addBtnDisable = true;
    this.showEditRole = true;
  }

  get form() { return this.addRoleForm.controls; }
  get editForm() { return this.editRoleForm.controls; }

  getRoleTypes = async () => {
    const roleTypesResp = await this.adminService.getData('getRoleTypes');
    if (roleTypesResp && roleTypesResp.responseCode === 1) {
      this.roleTypes = roleTypesResp.roleTypes;
    }
  }

  getRoles = async () => {
    const rolesResp = await this.adminService.getData('getRoles');
    if (rolesResp && rolesResp.responseCode === 1) {
      this.rolesList = rolesResp.roles;
    }
  }

  getModules = async () => {
    const modulesResp = await this.adminService.getData('getModules');
    if (modulesResp && modulesResp.responseCode === 1) {
      return modulesResp.modules;
    }
    return null;
  }
    

  changeParent = (data: any, event: any) => {
    if (event.target.checked === true) {
      this.selectedIds.push({ module_val: data, checked: true });
      this.selectedIds[this.selectedIds.length - 1]['view'] = true;
      this.selectedIds[this.selectedIds.length - 1]['edit'] = true;
      this.selectedIds[this.selectedIds.length - 1]['delete'] = true;
    }
    if (event.target.checked === false) {
      this.selectedIds = this.selectedIds.filter((item: any) => item.module_val !== data);
    }

  }

  changeChild = (parentKey: any, childKey: any, event: any) => {
    let item: any = this.selectedIds.find((x: any) => x.module_val == parentKey)
    if(typeof item != 'undefined'){
      item[childKey] = event.target.checked;      
    }  
  }

  isChecked = (parentKey: any, childKey: any) => {
    let item: any = this.selectedIds.find((x: any) => x.module_val == parentKey)
    return item ? item[childKey] : false
  }

  addFormSubmit = async () => {
    try {
      this.addBtnDisable = true;
      if(this.addRoleForm.value.role_name.length > 0 && this.selectedIds.length > 0){
        let formData = {...this.addRoleForm.value, modules: this.selectedIds};
        let resp = await this.adminService.addOrUpdateData('createRole', formData);
        if(resp && resp.responseCode === 1){
          this.showEditRole = false;
          this.showAddRole = false;
          this.getRoles();
          await successAlert("Role successfully added");
        }else{
          this.addBtnDisable = false;
          await errorAlert("Role adding has failed ! Please try again.");
        }      
      }else{ 
        await errorAlert("Please enter mandatory fields !");  
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }        
  }

  editFormSubmit = async () => {
    try {
      if(this.editRoleForm.value.role_name.length > 0 && this.selectedIds.length > 0){
        let formData = {...this.editRoleForm.value, modules: this.selectedIds};
        let resp = await this.adminService.addOrUpdateData('updateRole', formData);
        if(resp && resp.responseCode === 1){
          this.showEditRole = false;
          this.showAddRole = false;
          this.getRoles();
          await successAlert("Role successfully updated");  
        }else{
          this.addBtnDisable = false;
          await errorAlert("Role updating has failed ! Please try again.");  
        }      
      }else{   
        await errorAlert("Please enter mandatory fields !");  
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }     
  }

  deleteRole = (roleID: String) => {

  }

}

