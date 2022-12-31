import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authentication/authenticate.service';
import { Authenticate as AuthenticateModel } from '../../models/authenticate.model';
import { ConfirmedValidator } from '../../../helpers/confirmed.validator';
import { passwordRegx } from '../../../helpers/regExp';
import { errorAlert } from '../../../helpers/sweetalert';
import jwt_decode from 'jwt-decode';
import {isEmpty} from "lodash";

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  submitted = false;
  linkExpired = false;
  success = false;
  isLoggedIn!: Observable<AuthenticateModel>; 
  token = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private router: Router,
  ) { 
      if (this.authenticateService.isLoggedIn && !isEmpty(this.authenticateService.currentAdminUserValue)) {    
        this.router.navigate(['/auth/login']);
      }
   }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('token')){
      this.token = urlParams.get('token')!;
      const decoded: any = jwt_decode(this.token);
      const tokenDetails = decoded.data;
      const currentTime = new Date().getTime();
      if(!tokenDetails || (tokenDetails && tokenDetails.expiry < currentTime)){
        this.linkExpired = true;
      }else{
        this.checkResetTokenExpiry(this.token);
      }
    }else{
      this.linkExpired = true;
    }
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(passwordRegx)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: [
        ConfirmedValidator('password', 'confirm_password')
      ]      
    } as AbstractControlOptions
    );
  }

  get form() { return this.resetForm.controls; }

  checkResetTokenExpiry = async(token: string) => {
    try {
      const tokenResp = await this.authenticateService.validateResetToken(token);
      if(tokenResp && tokenResp.responseCode === 1 && tokenResp.tokenExpiry === false){
        this.linkExpired = false;
      }else{
        this.linkExpired = true;
      }
    } catch (error) {
      return;
    }    
  }

  onSubmit = async() => {
    try {
      this.success = false;
      this.submitted = true;
      // stop here if form is invalid
      if (this.resetForm.invalid) {
        this.submitted = false;
          return;
      }
      this.resetForm.value.token = this.token;
      const data = await this.authenticateService.resetPassword(this.resetForm.value);
      if(data && data.responseCode === 1){
        this.success = true;
      } else if(data && data.responseCode === 0 && (data.errorCode === 'iw1003' || data.errorCode === 'iw1008')){
        await errorAlert(data.message);
        this.router.navigate(['/auth/forgot-password']);
      }else if(data && data.responseCode === 0){
        await errorAlert(data.message);
      }else{
        await errorAlert('Something went wrong ! Please try again');
      }
    } catch (error: any) {
      await errorAlert(error);
    }
    this.resetForm.reset();
    this.submitted = false;
  }

}