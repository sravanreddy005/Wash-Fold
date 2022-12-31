import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { ConfirmedValidator, ConfirmNewIsNotOld } from '../../../helpers/confirmed.validator';
import { passwordRegx, emailRegx, addressRegx, alnumRegx, alphaRegx } from '../../../helpers/regExp';
import { successAlert, errorAlert, confirmAlert } from '../../helpers/sweetalert';
import { AuthenticateService } from '../../services/authentication/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  updateProfileForm!: FormGroup;
  changePswdForm!: FormGroup;
  changeEmailForm!: FormGroup;
  confirmPswdForm!: FormGroup;
  submitted = false;
  userData: any = {};
  currentAdminUserData: any = {};
  showPswdModal: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private authenticateService: AuthenticateService,
  ) { }

  ngOnInit(): void { 
    this.currentAdminUserData = this.authenticateService.currentAdminUserValue;

    this.updateProfileForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(alphaRegx)]],
      last_name: ['', [Validators.pattern(alphaRegx)]],
      mobile_number: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(addressRegx)]]
    });

    this.changeEmailForm = this.formBuilder.group({
      email: [this.currentAdminUserData.email, [Validators.required, Validators.pattern(emailRegx)]]
    });

    this.changePswdForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.pattern(passwordRegx)]],
      confirm_new_password: ['', [Validators.required]],
    }, {
      validator: [
        ConfirmNewIsNotOld('old_password', 'new_password'), 
        ConfirmedValidator('new_password', 'confirm_new_password')
      ]      
    } as AbstractControlOptions
    );

    this.confirmPswdForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });

    this.getAdminProfile();
  }

  getAdminProfile = async() => {
    const resp = await this.adminService.getData('getAdminProfile');
    if(resp && resp.responseCode === 1 && resp.data){
      this.userData = resp.data;
      const updateData = {
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        mobile_number: this.userData.mobile_number,
        address: this.userData.address
      }
      this.updateProfileForm.setValue(updateData);
    }    
  }

  get editForm(){ return this.updateProfileForm.controls; }
  get emailForm() { return this.changeEmailForm.controls; }
  get cPswdForm() { return this.changePswdForm.controls; }
  get pswdForm() { return this.confirmPswdForm.controls; }

  updateProfileFormSubmit = async() => {
    try {
      // stop here if form is invalid
      if (this.updateProfileForm.invalid) {
          return;
      }
      const updateResp = await this.adminService.addOrUpdateData('updateAdminProfile', this.updateProfileForm.value);
      if(updateResp && updateResp.responseCode === 1){
        this.getAdminProfile();
        await successAlert("Details updated successfully")
      }else if(updateResp && updateResp.responseCode === 0){
        await errorAlert(updateResp.message);
      }else{
        await errorAlert("Details updating has failed ! Please try again");
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }    
  }

  changeEmailFormSubmit = async() => {
    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.changeEmailForm.invalid || this.confirmPswdForm.invalid) {
        this.submitted = false;
        return;
      }
      if((this.currentAdminUserData.email).toLowerCase() === this.changeEmailForm.value.email){        
        this.submitted = false;
        document.getElementById("close_password_modal")?.click();
        await errorAlert('Sorry ! New and Old email should be different.');
        return;
      }
      
      const updateData = {
        email: this.userData.email,
        new_email: this.changeEmailForm.value.email,
        password: this.confirmPswdForm.value.password
      }
      const data = await this.adminService.addOrUpdateData('updateAdminEmail', updateData);
      if(data && data.responseCode === 1){
        if(data.accessToken){
          let resp = this.authenticateService.setCurrentUserSubject(data);
          if(resp){
            await successAlert('Email updated successfully');
            this.submitted = false;
            this.confirmPswdForm.reset();
            document.getElementById("close_password_modal")?.click();
            return;
          }
        }
        if(await confirmAlert('Email updated successfully ! Please login again.')){
          this.authenticateService.logout();
        }else{
          this.authenticateService.logout();
        }
      } else if(data && data.responseCode === 0){
        await errorAlert(data.message);
      }else{
        await errorAlert('Something went wrong ! Please try again.');
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    this.submitted = false;
    this.confirmPswdForm.reset();
    document.getElementById("close_password_modal")?.click();
  }

  changePasswordFormSubmit = async() => {
    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.changePswdForm.invalid) {
        this.submitted = false;
        return;
      }
      
      const data = await this.adminService.addOrUpdateData('updateAdminPassword', this.changePswdForm.value);
      if(data && data.responseCode === 1){
        await successAlert('Password updated successfully');
        this.changePswdForm.reset();
      } else if(data && data.responseCode === 0){
        await errorAlert(data.message);
      }else{
        await errorAlert('Something went wrong ! Please try again.');
      }
    } catch (error: any) {
      await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    this.submitted = false;
  }

}
