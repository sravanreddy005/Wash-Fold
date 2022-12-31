import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToasterService } from '../../../services/toaster/toaster.service';
import { AuthenticateService } from '../../services/authentication/authenticate.service';
import { Authenticate as AuthenticateModel } from '../../models/authenticate.model';
import {isEmpty} from "lodash";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public isErrors = false;
  public errMessage: any;
  public isLoggedIn!: Observable<AuthenticateModel>; 
  public loginForm!: FormGroup;

  constructor(    
    private formBuilder: FormBuilder,
    // private toasterService: ToasterService,
    private authenticateService: AuthenticateService,
    private router: Router,
    
  ) { 
      if (this.authenticateService.isLoggedIn && !isEmpty(this.authenticateService.currentAdminUserValue)) { 
        this.router.navigate(['/admin/dashboard']);
      }
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = false;
        return;
    }    
    this.authenticateService.login(this.loginForm.value).subscribe({
      next: (data : any) => {
        if(data && data.responseCode === 1){
          this.loginForm.reset();
          this.router.navigate(['/admin/dashboard']);
        } else if(data && data.responseCode === 0){
          this.errMessage = data.message;
          // this.toasterService.showToast('slash-outline','danger', data.message);
        }else{
          this.errMessage = 'An error occured ! Please try again';
          // this.toasterService.showToast('slash-outline','danger', 'An error occured ! Please try again');
        }
      },
      error: (err) => {  
        this.errMessage = 'An error occured ! Please try again'; 
        // this.errMessage = err?.message ? err?.message : err?.error?.message;
        // this.toasterService.showToast('slash-outline','danger', this.errMessage);
      },
      complete: () => {}
    });
    this.submitted = false;    
  }

}
