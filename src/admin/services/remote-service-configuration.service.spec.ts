import { TestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationService } from './remote-service-configuration.service';

describe('RemoteServiceConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteServiceConfigurationService = TestBed.get(RemoteServiceConfigurationService);
    expect(service).toBeTruthy();
  });
});
