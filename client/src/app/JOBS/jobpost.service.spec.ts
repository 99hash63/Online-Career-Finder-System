import { TestBed } from '@angular/core/testing';

import { JobpostService } from './jobpost.service';

describe('JobpostService', () => {
  let service: JobpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
