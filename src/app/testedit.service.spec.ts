import { TestBed, inject } from '@angular/core/testing';

import { TesteditService } from './testedit.service';

describe('TesteditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TesteditService]
    });
  });

  it('should be created', inject([TesteditService], (service: TesteditService) => {
    expect(service).toBeTruthy();
  }));
});
