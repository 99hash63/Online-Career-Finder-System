import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompanyEditComponent } from './my-company-edit.component';

describe('MyCompanyEditComponent', () => {
  let component: MyCompanyEditComponent;
  let fixture: ComponentFixture<MyCompanyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompanyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
