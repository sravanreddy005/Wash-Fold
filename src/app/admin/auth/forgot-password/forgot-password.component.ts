import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authentication/authenticate.service';
import { successAlert, errorAlert } from '../../../helpers/sweetalert';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotForm!: FormGroup;
  public submitted = false;
  public isErrors = false;
  public errMessage = '';

  constructor(private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.forgotForm.controls; }

  onSubmit = async() => {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      this.submitted = false;
        return;
    }
    try {
      const data = await this.authenticateService.forgotPassword(this.forgotForm.value);
      if(data && data.responseCode === 1){
        await successAlert('We have sent you a reset link to your registered email.');
      } else if(data && data.responseCode === 0){
        await errorAlert(data.message);
      }else{
        await errorAlert('Something went wrong ! Please try again');
      }
    } catch (err: any) {
      await errorAlert(err?.error?.message);
    }  
    this.forgotForm.reset();
    this.submitted = false; 
  }

}
