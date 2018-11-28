import { TestBed } from '@angular/core/testing';

import { LazyimgResizeService } from './lazyimg-resize.service';

describe('ResizeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyimgResizeService = TestBed.get(LazyimgResizeService);
    expect(service).toBeTruthy();
  });
});
