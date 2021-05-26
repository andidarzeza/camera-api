import { TestBed } from '@angular/core/testing';

import { CameraServiceService } from './camera-service.service';

describe('CameraServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraServiceService = TestBed.get(CameraServiceService);
    expect(service).toBeTruthy();
  });
});
