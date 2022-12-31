import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as ObservableOf } from 'rxjs';
import { AuthenticateService } from '../authentication/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private accessListArraySubject!: BehaviorSubject<any>;
  public accessModulesArray!: Observable<any>;
  public currentAdminUser! : any;
  public userModules!: any;

  constructor(
    private authenticateService: AuthenticateService
  ) {
    this.accessListArraySubject = new BehaviorSubject<any>([]);
    this.accessModulesArray = this.accessListArraySubject.asObservable();
   }  

  get currentAdminUserModules() {
    return this.accessListArraySubject.asObservable();
  }

  setAccessList = (modules_list: any) => { 
    return new Promise((resolve, reject) => {
      if(modules_list){             
        let modulesList = Array.isArray(modules_list) ? modules_list : JSON.parse(modules_list);
        let moduleVals: any = [];
        modulesList.map((module: any) => {
            moduleVals.push(module.module_val)
        });
        this.accessListArraySubject.next(moduleVals);
        resolve(true);
      }
      resolve(false);
    });    
  }

  checkAccess = (modulesList: any, routeVal: any) => {   
    return new Promise((resolve, reject) => {  
      if (modulesList) {
          let modules_list = Array.isArray(modulesList) ? modulesList : JSON.parse(modulesList);
          let moduleArray = modules_list.filter((module: any) => module.module_val === routeVal && module.view === true);
          let value = (moduleArray.length > 0) ? true : false;
          resolve(value);
      }else{
        resolve(false);
      }
    });
  }

  getActionAccess = (routeVal: any) => {   
    this.currentAdminUser = this.authenticateService.currentAdminUserValue;
    this.userModules = (this.currentAdminUser) ? this.currentAdminUser.access_modules : null;
    if (this.userModules) {
        let modules = Array.isArray(this.userModules) ? this.userModules : JSON.parse(this.userModules);    
        const moduleArray = modules.filter((module: any) => module.module_val === routeVal && module.view === true);
        return (moduleArray.length > 0) ? moduleArray : [];
    }else{
        return [];
    }
  }


}
