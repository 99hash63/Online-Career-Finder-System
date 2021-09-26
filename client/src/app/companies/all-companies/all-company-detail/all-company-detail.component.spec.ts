import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyDetailComponent } from './all-company-detail.component';

describe('AllCompanyDetailComponent', () => {
  let component: AllCompanyDetailComponent;
  let fixture: ComponentFixture<AllCompanyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCompanyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
