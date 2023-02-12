import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { successAlert, errorAlert, deleteConfirmAlert } from '../../helpers/sweetalert';
import { alnumRegx, alphaRegx } from '../../../helpers/regExp';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  addForm!: FormGroup;
  updateForm!: FormGroup;
  submitted = false;
  list: any;
  selectedFile: any;
  userAccess = {view: true, edit: false, delete: false};

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
  ) { }

  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('categories');    
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }
    this.addForm = this.formBuilder.group({
      category_name: ['', [Validators.required, Validators.pattern(alnumRegx)]],
    });
    this.updateForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      category_name: ['', [Validators.required, Validators.pattern(alnumRegx)]],
    });

    this.getCategories();
  }

  getCategories = async() => {
    const resp = await this.adminService.getData('getCategories');
    console.log('resp', resp);
    
    if(resp && resp.responseCode === 1 && resp.data){
      this.list = resp.data;
      console.log('this.list', this.list);
    }
  }

  edit = (data: any) => {
    console.log('edit data', data);
    
    this.updateForm.setValue({id: data.id, category_name: data.category_name});
  }

  get form() { return this.addForm.controls; }
  get editForm() { return this.updateForm.controls; }

  onFileSelect = async(event: any) => {
    this.selectedFile = event.target.files;
  }

  addFormSubmit = async() => {
    try {
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
        formData.append('image_path', 'categories');
        formData.append("category_image", this.selectedFile[0], this.selectedFile[0]['name']);
      }
      const addResp = await this.adminService.addOrUpdateData('addCategories', formData);
      if(addResp && addResp.responseCode === 1){
        this.getCategories();
        await successAlert("Details added successfully");
      }else if(addResp && addResp.responseCode === 0){
        await errorAlert(addResp.message);
      }else{
        await errorAlert("Details adding has failed ! Please try again");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    this.submitted = false;
    this.selectedFile = '';
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
      let formData = new FormData;
      for (const key of Object.keys(this.updateForm.value)) {
        let value = this.updateForm.value[key];
        formData.append(key, value);
      }
      if(this.selectedFile && this.selectedFile.length > 0){
        formData.append('image_path', 'categories');
        formData.append("category_image", this.selectedFile[0], this.selectedFile[0]['name']);
      }
      const updateResp = await this.adminService.addOrUpdateData('updateCategories', formData);
      if(updateResp && updateResp.responseCode === 1){
        this.getCategories();
        await successAlert("Details updated successfully");
      }else if(updateResp && updateResp.responseCode === 0){
        await errorAlert(updateResp.message);
      }else{
        await errorAlert("Details updating has failed ! Please try again");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    
    this.submitted = false;
    this.selectedFile = '';
    this.updateForm.reset();
    document.getElementById("close_edit_modal")?.click();
  }

  delete = async(id: String) => {
    try {
      if(this.userAccess.delete){
        if(await deleteConfirmAlert('If you delete this, related products will also delete. Want to delete this category?')){
          const resp = await this.adminService.deleteData('deleteCategories', id);
          if(resp && resp.responseCode === 1){
            this.getCategories();
            await successAlert("Details deleted successfully")
          }else{
            await errorAlert("Details deleting has failed ! Please try again")
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
