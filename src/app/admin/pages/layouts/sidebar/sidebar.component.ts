import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessService } from '../../../services/access/access.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public routerVal: any;
  public modulesList: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accessService: AccessService
  ) { }

  ngOnInit(): void {
    this.accessService.currentAdminUserModules.subscribe(val => {
      this.modulesList = val
    });
    this.routerVal = this.activatedRoute.snapshot;    
  }

}
