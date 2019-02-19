import { TestBed } from '@angular/core/testing';

import { InterceptorServiceService } from './interceptor-service.service';

describe('InterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptorServiceService = TestBed.get(InterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
