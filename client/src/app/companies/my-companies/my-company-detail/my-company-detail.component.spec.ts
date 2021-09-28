import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompanyDetailComponent } from './my-company-detail.component';

describe('MyCompanyDetailComponent', () => {
  let component: MyCompanyDetailComponent;
  let fixture: ComponentFixture<MyCompanyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompanyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
