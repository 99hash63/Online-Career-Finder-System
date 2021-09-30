import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRatingsComponent } from './company-ratings.component';

describe('CompanyRatingsComponent', () => {
  let component: CompanyRatingsComponent;
  let fixture: ComponentFixture<CompanyRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
