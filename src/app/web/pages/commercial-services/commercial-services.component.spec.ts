import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialServicesComponent } from './commercial-services.component';

describe('CommercialServicesComponent', () => {
  let component: CommercialServicesComponent;
  let fixture: ComponentFixture<CommercialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
