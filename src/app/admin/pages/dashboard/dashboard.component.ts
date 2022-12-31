import {Component, OnInit} from '@angular/core';
import { AccessService } from '../../services/access/access.service';
import { AdminService } from '../../services/admin/admin.service';
import { AuthenticateService } from '../../services/authentication/authenticate.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  
  currentUserData: any;
  isSuperAdmin: boolean = false;
  totalBranchesCount: number = 0;
  totalUsersCount: number = 0;
  totalActiveUsersCount: number = 0;
  totalInActiveUsersCount: number = 0;
  userAccess: any;

  constructor(
    private adminService: AdminService,
    private authenticateService: AuthenticateService,
    private accessService: AccessService,
  ) {}

  ngOnInit(){
    this.currentUserData = this.authenticateService.currentAdminUserValue;
    if(this.currentUserData && this.currentUserData.role_type && this.currentUserData.role_type === 'Super-Admin'){
      this.isSuperAdmin = true;
    }

    const branchesAccessData = this.accessService.getActionAccess('branches');
    const usersAccessData = this.accessService.getActionAccess('users');
    this.userAccess = {
      branches: branchesAccessData.length > 0 ? true : false,
      users: usersAccessData.length > 0 ? true : false,
    }

    branchesAccessData.length > 0 && this.getBranchesCount();
    usersAccessData.length > 0 && this.getUsersCount();
  }

  getBranchesCount = async() => {
    try {
      let resp = await this.adminService.getData('getBranchesCount');          
      if(resp && resp.responseCode === 1 && resp.count){
        this.totalBranchesCount = resp.count;
      }
    } catch (error) {
      this.totalBranchesCount = 0;
    }    
  }

  getUsersCount = async() => {
    try {
      let resp = await this.adminService.getData('getUsersCount');          
      if(resp && resp.responseCode === 1 && resp.count){
        this.totalUsersCount = resp.count.totalUsers;
        this.totalActiveUsersCount = resp.count.activeUsers;
        this.totalInActiveUsersCount = resp.count.totalUsers - resp.count.activeUsers;
      }
    } catch (error) {
      this.totalUsersCount = 0;
    }    
  }

}
