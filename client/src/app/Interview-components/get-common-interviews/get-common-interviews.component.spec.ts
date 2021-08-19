import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCommonInterviewsComponent } from './get-common-interviews.component';

describe('GetCommonInterviewsComponent', () => {
  let component: GetCommonInterviewsComponent;
  let fixture: ComponentFixture<GetCommonInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCommonInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCommonInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
