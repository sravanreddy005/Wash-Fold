import { Component } from '@angular/core';
import { WebService } from '../../services/web/web.service';
import { environment } from '../../../../environments/environment';
import { getSumByKey } from '../../../helpers/common';
import { decode } from 'html-entities';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent {

  public orderID: any;
  public status: any;
  public orderDetails: any;
  public orderProducts: any = [];
  public serverURL: any = environment.SERVER_URL;
  public currency: any = decode('&#163;');
  public totalAmount: any = 0;

  constructor(
    private webService: WebService,
  ){  }

  ngOnInit(): void {
    // localStorage.removeItem('cartItems');
    let sessionStorageData = sessionStorage.getItem('orderInfo');
    if(sessionStorageData){
      let orderInfo = JSON.parse(sessionStorageData);
      if(orderInfo && orderInfo.orderID){
        this.orderID = orderInfo.orderID;
        this.status = orderInfo.status;
        this.getOrderDetails();
      }
    }
  }

  getOrderDetails = async() => {
    let resp = await this.webService.getData('getOrderDetails', {order_id: this.orderID});
    if(resp && resp.orderInfo){
      this.orderDetails = resp.orderInfo;
      this.orderProducts = resp.orderInfo.orders;
      this.totalAmount = await getSumByKey(this.orderProducts, 'total_price');
    }
  }
}
