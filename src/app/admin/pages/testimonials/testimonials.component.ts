import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { AccessService } from '../../services/access/access.service';
import { alphaRegx, mobileRegx, addressRegx, alnumSpecialRegx, pincodeRegx, urlRegx, emailRegx, nonHTMLRegx, floatRegx } from '../../../helpers/regExp';
import { deleteConfirmAlert, changeConfirmAlert, successAlert, errorAlert } from '../../helpers/sweetalert';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

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

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private accessService: AccessService,
  ) { }


  ngOnInit(): void {
    const accessData = this.accessService.getActionAccess('testimonials');
    if(accessData && accessData.length > 0){
      this.userAccess.edit = accessData[0].edit;
      this.userAccess.delete = accessData[0].delete;
    }    

    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.minLength(3), Validators.maxLength(100)]],
      rating: ['', [Validators.pattern(floatRegx)]],
      description: ['', [Validators.required, Validators.pattern(nonHTMLRegx), Validators.minLength(10)]],
    });

    this.updateForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(alnumSpecialRegx), Validators.minLength(3), Validators.maxLength(100)]],
      rating: ['', [Validators.pattern(floatRegx)]],
      description: ['', [Validators.required, Validators.pattern(nonHTMLRegx), Validators.minLength(10)]],
    });

    this.getTestimonialsList();
  }

  changePageSize = (event: any) => {    
    this.pageSize = event.target.value;
  }

  getTestimonialsList = async() => {
    try {
      let resp = await this.adminService.getData('getTestimonials');  
      if(resp && resp.responseCode === 1 && resp.list){
        this.list = resp.list;
        this.totalCount = (resp.list).length;
      }
    } catch (error) {
      this.list = {};
    }    
  }

  edit = (data: any) => {
    const updateData = {
      id: data.id,
      name: data.name,
      description: data.description,
      rating: data.rating ? data.rating : null,
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
        const addResp = await this.adminService.addOrUpdateData('addTestimonial', this.addForm.value);
        if(addResp && addResp.responseCode === 1){
          this.getTestimonialsList();
          await successAlert("Testimonial added successfully");
          this.addForm.reset();
          document.getElementById("close_add_modal")?.click();
        }else if(addResp && addResp.responseCode === 0){
          await errorAlert(addResp.message);
        }else{
          await errorAlert("Testimonial adding has failed ! Please try again");
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
        const updateResp = await this.adminService.addOrUpdateData('updateTestimonial', this.updateForm.value);
        if(updateResp && updateResp.responseCode === 1){
          this.getTestimonialsList();
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
      if (this.userAccess.edit) {
        const currentStatus = data.active;
        const status = (currentStatus) ? 'inactive' : 'active';
        if (await changeConfirmAlert(`Want to ${status} this testimonial`)) {
          const statusResp = await this.adminService.addOrUpdateData('updateTestimonialStatus', { id: data.id, current_status: currentStatus });
          if (statusResp && statusResp.responseCode === 1) {
            this.getTestimonialsList();
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
        if(await deleteConfirmAlert('Want to delete this testimonial')){
          const deleteResp = await this.adminService.deleteData('deleteTestimonial' , id);
          if(deleteResp && deleteResp.responseCode === 1){
            this.getTestimonialsList();
            await successAlert("Testimonial deleted successfully")
          }else{
            await errorAlert("Testimonial deleting has failed ! Please try again")
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

