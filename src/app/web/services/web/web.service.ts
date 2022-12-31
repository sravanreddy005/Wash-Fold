import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private nodeURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  /************** COMMON METHODS ****************/
  getData = async(apiName: String, data: any = {}): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/web/${apiName}`, data);  
    let respData= await lastValueFrom(resp);
    return respData;
  }

  addOrUpdateData = async(apiName: String, values: Object): Promise<any> => {
    let resp = this.http.post(`${this.nodeURL}/web/${apiName}`, values);  
    let respData= await lastValueFrom(resp);
    return respData;
  }
  /************** COMMON METHODS ****************/
}
