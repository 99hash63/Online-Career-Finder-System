import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedSuccessComponent } from './applied-success.component';

describe('AppliedSuccessComponent', () => {
  let component: AppliedSuccessComponent;
  let fixture: ComponentFixture<AppliedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
