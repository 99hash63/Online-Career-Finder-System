import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverhomeComponent } from './discoverhome.component';

describe('DiscoverhomeComponent', () => {
  let component: DiscoverhomeComponent;
  let fixture: ComponentFixture<DiscoverhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
