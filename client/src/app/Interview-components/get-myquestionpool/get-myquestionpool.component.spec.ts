import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyquestionpoolComponent } from './get-myquestionpool.component';

describe('GetMyquestionpoolComponent', () => {
  let component: GetMyquestionpoolComponent;
  let fixture: ComponentFixture<GetMyquestionpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMyquestionpoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMyquestionpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
