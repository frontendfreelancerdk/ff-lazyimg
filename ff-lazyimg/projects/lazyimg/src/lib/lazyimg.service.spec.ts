import { TestBed, inject } from '@angular/core/testing';

import { LazyimgService } from './lazyimg.service';

describe('LazyimgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyimgService]
    });
  });

  it('should be created', inject([LazyimgService], (service: LazyimgService) => {
    expect(service).toBeTruthy();
  }));
});
