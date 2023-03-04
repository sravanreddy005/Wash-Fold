import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { decode } from 'html-entities';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from "../../services/product.service";
import { WebService } from "../../services/web/web.service";
import { alnumRegx, emailRegx, mobileRegx, addressRegx, pincodeRegx, numRegx } from "../../../helpers/regExp";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public existingCustomerForm:  FormGroup;
  public otpForm:  FormGroup;
  public products: any = [];
  public totalAmount:  any;
  public timeSlots:  any = [];
  public submitted: boolean = false;
  public currentDate: any = new Date().getFullYear() +'-'+ ('0' +(new Date().getMonth() + 1)).slice(-2) +'-'+ ('0'+new Date().getDate()).slice(-2);
  public pickupDateMin: any = this.currentDate;
  public dropDateMin: any = new Date(this.currentDate).getFullYear() +'-'+ ('0' +(new Date(this.currentDate).getMonth() + 1)).slice(-2) +'-'+ ('0'+ (new Date(this.currentDate).getDate() + 1)).slice(-2);
  public pickupTimeSlots: any = [];
  public dropTimeSlots: any = [];
  public dropTimeSlotsList: any = [];
  public paymentType: string = 'Card';
  public currencySymbol: string = decode('&#163;');
  public json:any = JSON;  
  public emailVerified:boolean = false;  
  

  constructor(
    private fb: UntypedFormBuilder,
    public productService: ProductService,
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { 
    this.checkoutForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(alnumRegx)]],
      last_name: ['', [Validators.required, Validators.pattern(alnumRegx)]],
      mobile_number: ['', [Validators.required, Validators.pattern(mobileRegx)]],
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', [Validators.required, Validators.pattern(pincodeRegx)]],
      address1: ['', [Validators.required, Validators.pattern(addressRegx), Validators.maxLength(100)]],
      address2: ['', [Validators.required, Validators.pattern(addressRegx), Validators.maxLength(100)]],
      city: ['Manchester', [Validators.required]],
      pickup_date: ['', Validators.required],
      pickup_time_slot: ['', Validators.required],
      drop_date: ['', Validators.required],
      drop_time_slot: ['', Validators.required]
    });

    this.existingCustomerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(numRegx), Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe((response: any) => this.products = response);
    this.getTotal.subscribe(amount => this.totalAmount = amount);

    this.getTimeSlots();
    if(this.totalAmount < 20){
      this.toastr.error('We accept minimum order amount of £ 20 to proceed for checkout.');
      this.submitted = false;
      return;
    }
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  getTimeSlots =async () => {
    let resp = await this.webService.getData('getTimeSlots');
    if(resp){
      this.timeSlots = resp.data;
      console.log('this.timeSlots', this.timeSlots);      
      this.pickupTimeSlots = this.timeSlots.filter((data: any) => data.type === "pick-up");
      this.dropTimeSlotsList = this.timeSlots.filter((data: any) => data.type === "drop");   
    }
  }

  get form() { return this.checkoutForm.controls; }
  get form1() { return this.existingCustomerForm.controls; }
  get form2() { return this.otpForm.controls; }

  handlePickupDateChange = () => {
    this.checkoutForm.patchValue({drop_date: ''})
    let pickupDate = this.checkoutForm.value.pickup_date;
    let date = new Date(pickupDate);
    this.dropDateMin = date.getFullYear() +'-'+ ('0' +(date.getMonth() + 1)).slice(-2) +'-'+ ('0'+ (date.getDate() + 1)).slice(-2);
  }

  handlePickupTimeSlotChange = () => {
    let pickupTime = this.checkoutForm.value.pickup_time_slot;
    if(pickupTime){
      let parsedTime = JSON.parse(pickupTime);
      let pickupFromTime = parseInt(parsedTime.from_time.split(':')[0]);
      this.dropTimeSlots = this.dropTimeSlotsList.filter((data: any) => parseInt(data.from_time.split(':')[0]) >= pickupFromTime);
    }    
  }

  handlePaymentType = (type: string) => {
    this.paymentType = type;
  }

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors = (control instanceof FormGroup || control instanceof FormArray)
            ? this.getAllErrors(control)
            : control?.errors;
        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  openModal(checkout: any) {
    this.modalService.open(checkout);
  }

  existingCustomerFormSubmit = async() => {
    let resp = await this.webService.getData('getExistingCustomerDetails', this.existingCustomerForm.value);
    if(resp && resp.info){
      let data = {
        first_name: resp.info.first_name,
        last_name: resp.info.last_name,
        email: resp.info.email,
        mobile_number: resp.info.mobile_number,
        pincode: resp.info.pincode,
        address1: resp.info.address1,
        address2: resp.info.address2
      }

      this.checkoutForm.patchValue(data);
      document.getElementById('existing-m-close')?.click();
      this.existingCustomerForm.patchValue({email: ''});
    }
  }

  otpFormSubmit = async() => {
    let resp = await this.webService.getData('verifyOTP', {email: this.checkoutForm.value.email, otp: this.otpForm.value.otp});
    if(resp && resp.responseCode === 1){
      this.emailVerified = true;
      this.checkoutFormSubmit();
    }else{
      scroll(0,0);
      this.toastr.error('Email verification failed! Please try again.');
    }
  }

  checkoutFormSubmit = async() => {
    try {
      this.submitted = true;      
      // stop here if form is invalid
      if (this.checkoutForm.invalid) {
        this.submitted = false;
        return;
      }        
      if(this.totalAmount < 20){
        scroll(0,0);
        this.toastr.error('Minimum 20Pounds Cart Value for Checkout');
        this.submitted = false;
        return;
      } 
      if(this.emailVerified){
        let formData = {...this.checkoutForm.value, payment_type: this.paymentType, cart_items: this.products};
        const addResp = await this.webService.addOrUpdateData('addOrder', formData);
        if(addResp && addResp.responseCode === 1 && addResp.orderID){
          // await successAlert("Details added successfully");  
          document.getElementById('otp-m-close')?.click();      
          sessionStorage.setItem('orderInfo', JSON.stringify({orderID: addResp.orderID, status: addResp.status}));
          this.productService.removeCart();
          this.router.navigate(['/order-status']);
        }else if(addResp && addResp.responseCode === 0){
          // await errorAlert(addResp.message);
          scroll(0,0);
          this.toastr.error(addResp.message);
        }else{
          scroll(0,0);
          this.toastr.error("Details adding has failed ! Please try again");
          // await errorAlert("Details adding has failed ! Please try again");
        }
      }else{
        const addResp = await this.webService.addOrUpdateData('sendVerificationEmail', {email: this.checkoutForm.value.email, name: this.checkoutForm.value.first_name});
        if(addResp && addResp.responseCode === 1){
          document.getElementById('otpModalBtn')?.click();
        }
      }
    } catch (error: any) {
      scroll(0,0);
      this.toastr.error(error.message ? error.message : 'Something went wrong ! Please try again');
      // await errorAlert(error.message ? error.message : 'Something went wrong ! Please try again');
    }
    this.submitted = false;
    // this.checkoutForm.reset();
  }

}
