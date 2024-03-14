import { TestBed } from '@angular/core/testing';

import { ImgCompressionService } from './img-compression.service';

describe('ImgCompressionService', () => {
  let service: ImgCompressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgCompressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
