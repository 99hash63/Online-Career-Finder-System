import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewsComponent } from './update-interviews.component';

describe('UpdateInterviewsComponent', () => {
  let component: UpdateInterviewsComponent;
  let fixture: ComponentFixture<UpdateInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
