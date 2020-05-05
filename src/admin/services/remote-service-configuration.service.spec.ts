import { TestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationService } from './remote-service-configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RemoteServiceConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RemoteServiceConfigurationService = TestBed.get(RemoteServiceConfigurationService);
    expect(service).toBeTruthy();
  });
});
