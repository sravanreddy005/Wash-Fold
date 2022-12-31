import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/authentication/authenticate.service';
import { AdminService } from '../../../services/admin/admin.service';
import { logoutConfirmAlert, errorAlert } from '../../../helpers/sweetalert';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  firstName: any;
  currentUserData: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authenticateService: AuthenticateService,
    ) { }

  ngOnInit(): void {
    this.currentUserData = this.authenticateService.currentAdminUserValue;
    this.firstName = this.currentUserData.first_name;
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout = async() => {
    if(await logoutConfirmAlert()){
      this.authenticateService.logout();
    }
  }

}
