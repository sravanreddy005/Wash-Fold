import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialServicesComponent } from './residential-services.component';

describe('ResidentialServicesComponent', () => {
  let component: ResidentialServicesComponent;
  let fixture: ComponentFixture<ResidentialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
