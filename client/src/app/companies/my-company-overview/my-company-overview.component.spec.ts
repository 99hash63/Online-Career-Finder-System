import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompanyOverviewComponent } from './my-company-overview.component';

describe('MyCompanyOverviewComponent', () => {
  let component: MyCompanyOverviewComponent;
  let fixture: ComponentFixture<MyCompanyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompanyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompanyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
