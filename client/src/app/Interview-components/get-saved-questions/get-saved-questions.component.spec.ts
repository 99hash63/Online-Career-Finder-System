import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSavedQuestionsComponent } from './get-saved-questions.component';

describe('GetSavedQuestionsComponent', () => {
  let component: GetSavedQuestionsComponent;
  let fixture: ComponentFixture<GetSavedQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSavedQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSavedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
