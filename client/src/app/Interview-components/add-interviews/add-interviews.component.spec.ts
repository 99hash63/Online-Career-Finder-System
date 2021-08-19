import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewsComponent } from './add-interviews.component';

describe('AddInterviewsComponent', () => {
  let component: AddInterviewsComponent;
  let fixture: ComponentFixture<AddInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
