import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { successAlert, errorAlert } from '../../helpers/sweetalert';
import { alphaRegx } from '../../../helpers/regExp';

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.scss']
})
export class ModulesListComponent implements OnInit {

  addForm!: FormGroup;
  updateForm!: FormGroup;
  submitted = false;
  list: any;
  userAccess = {view: true, edit: false, delete: false};

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
  ) { }

  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('modules');    
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }
    this.addForm = this.formBuilder.group({
      module_name: ['', [Validators.required, Validators.pattern(alphaRegx), Validators.minLength(3)]],
    });
    this.updateForm = this.formBuilder.group({
      module_id: ['', [Validators.required]],
      module_name: ['', [Validators.required, Validators.pattern(alphaRegx), Validators.minLength(3)]],
    });

    this.getModules();
  }

  getModules = async() => {
    const modulesResp = await this.adminService.getData('getModules');
    if(modulesResp && modulesResp.responseCode === 1 && modulesResp.modules){
      this.list = modulesResp.modules;
    }
  }

  edit = (data: any) => {
    this.updateForm.setValue({module_id: data.id, module_name: data.module_name});
  }

  get form() { return this.addForm.controls; }
  get editForm() { return this.updateForm.controls; }

  addFormSubmit = async() => {
    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addForm.invalid) {
        this.submitted = false;
          return;
      }
      const addResp = await this.adminService.addOrUpdateData('addModule', this.addForm.value);
      if(addResp && addResp.responseCode === 1){
        this.getModules();
        await successAlert("Module added successfully");
      }else if(addResp && addResp.responseCode === 0){
        await errorAlert(addResp.message);
      }else{
        await errorAlert("Module adding has failed ! Please try again");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    this.submitted = false;
    this.addForm.reset();
  }

  updateFormSubmit = async() =>{
    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.updateForm.invalid) {
        this.submitted = false;
          return;
      }
      const updateResp = await this.adminService.addOrUpdateData('updateModule', this.updateForm.value);
      if(updateResp && updateResp.responseCode === 1){
        this.getModules();
        await successAlert("Module updated successfully");
      }else if(updateResp && updateResp.responseCode === 0){
        await errorAlert(updateResp.message);
      }else{
        await errorAlert("Module updating has failed ! Please try again");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    
    this.submitted = false;
    this.updateForm.reset();
    document.getElementById("close_edit_modal")?.click();
  }

}

