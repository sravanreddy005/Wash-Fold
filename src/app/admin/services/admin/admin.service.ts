import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private nodeURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  /************** COMMON METHODS ****************/
  getData = async(apiName: String, data: any = {}): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/${apiName}`, data);  
    let respData= await lastValueFrom(resp);
    return respData;
  }

  addOrUpdateData = async(apiName: String, values: Object): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/${apiName}`, values);  
    let respData= await lastValueFrom(resp);
    return respData;
  }

  deleteData = async(apiName: String, id: any): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/${apiName}`, {id: id});  
    let respData= await lastValueFrom(resp);
    return respData; 
  }

  getPincodeDetails = async(pincode: any, country: string): Promise<any> => {
    try {
      if(country === 'CA'){
        pincode = pincode.replace(/ /g, '').replace(/-/g, '');
        pincode = pincode.substring(0,3);
      }else if(country === 'GB'){
        pincode = pincode.replace(/ /g, '').replace(/^(.*)(\d)/, "$1 $2");
      }
      let resp = this.http.get(`https://api.worldpostallocations.com/?postalcode=${pincode}&countrycode=${country}`);  
      let respData: any = await lastValueFrom(resp);
      let pincodeData = {};
      if(respData && respData.result && respData.result[0]){
        pincodeData = {
          country: respData.result[0].country,          
          state: respData.result[0].state,
          city: country === 'IN' ? respData.result[0].district : respData.result[0].postalLocation,
          mandal: respData.result[0].province,
          postalLocation: respData.result[0].postalLocation          
        }
      }
      return pincodeData;
    } catch (error) {
      return;
    }    
  }

  downLoadFiles = async(folderName: String, fileName: any): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/downLoadFiles`, {folderName, fileName}, { responseType: "blob" });  
    let respData: any = await lastValueFrom(resp);
    if(respData && (!respData.responseCode || respData.responseCode !== 0)){
      saveAs(respData, fileName);
    }
  }

  downLoadInvoicePDF = async(data: any): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/generateInvoicePDF`, {data: data}, { responseType: "blob" });  
    let respData: any = await lastValueFrom(resp);
    if(respData && (!respData.responseCode || respData.responseCode !== 0)){
      let fileNameVal = data.invoice_number ? (data.invoice_number).toLowerCase() : new Date().getTime();
      let fileName = 'invoice-' + fileNameVal + '.pdf'
      saveAs(respData, fileName);
    }
  }
  /************** END COMMON METHODS ****************/
}
