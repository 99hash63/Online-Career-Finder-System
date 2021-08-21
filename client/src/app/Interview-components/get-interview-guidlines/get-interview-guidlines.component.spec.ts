import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInterviewGuidlinesComponent } from './get-interview-guidlines.component';

describe('GetInterviewGuidlinesComponent', () => {
  let component: GetInterviewGuidlinesComponent;
  let fixture: ComponentFixture<GetInterviewGuidlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInterviewGuidlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInterviewGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
