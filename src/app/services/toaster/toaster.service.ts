import { Injectable } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbIconConfig
} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  config: NbToastrConfig;

  destroyByClick = true;
  duration = 5000;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';

  constructor(
    private toastrService: NbToastrService
  ) { }

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  
  showToast = (icon: any = '', type: NbComponentStatus, title: string, body: string = '') => {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
      hasIcon: true, 
      icon: icon,
      pack: 'eva'
    };

    this.toastrService.show(body, title, config)
  }
  
}
