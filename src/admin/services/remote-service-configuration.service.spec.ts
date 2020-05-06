import { TestBed, getTestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationService } from './remote-service-configuration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RemoteServiceConfigurationService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: RemoteServiceConfigurationService = TestBed.get(RemoteServiceConfigurationService);
    expect(service).toBeTruthy();
  });

  describe('getRemoteServiceConfigurationAddress', () => {
    it('should return remote service address', () => {
      const address = 'testAddress';
      const service: RemoteServiceConfigurationService = TestBed.get(RemoteServiceConfigurationService);
      service.getRemoteServiceConfigurationAddress()
        .subscribe(x => {
          expect(x).toBe(address);
        });

      const testRequest = httpMock.expectOne('api/Configuration/RemoteServiceAddress');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush(address);

      httpMock.verify();
    });
  });

  describe('setRemoteServiceConfigurationAddress', () => {
    it('should set remote service address', () => {
      const address = 'testAddress';
      const service: RemoteServiceConfigurationService = TestBed.get(RemoteServiceConfigurationService);
      service.setRemoteServiceConfigurationAddress(address)
        .subscribe(x => {

        });

      const testRequest = httpMock.expectOne('api/Configuration/RemoteServiceAddress');
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual({ value: address});

      httpMock.verify();
    });
  });
});
