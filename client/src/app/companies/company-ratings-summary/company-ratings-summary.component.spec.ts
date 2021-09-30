import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRatingsSummaryComponent } from './company-ratings-summary.component';

describe('CompanyRatingsSummaryComponent', () => {
  let component: CompanyRatingsSummaryComponent;
  let fixture: ComponentFixture<CompanyRatingsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRatingsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRatingsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
