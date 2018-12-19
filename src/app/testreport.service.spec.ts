import { TestBed, inject } from '@angular/core/testing';

import { TestreportService } from './testreport.service';

describe('TestreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestreportService]
    });
  });

  it('should be created', inject([TestreportService], (service: TestreportService) => {
    expect(service).toBeTruthy();
  }));
});
