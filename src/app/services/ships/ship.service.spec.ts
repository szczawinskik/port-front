import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShipService } from './ship.service';
import { Ship } from 'src/commons/entities/Ship';
import { of } from 'rxjs';
import { request } from 'http';

const mockShipList: Ship[] = [
  {
    id: 1, name: 'ship1', shipOwnerName: 'ownerName1', closestSchedule: null, schedules: []
  },
  {
    id: 2, name: 'ship2', shipOwnerName: 'ownerName2', closestSchedule: null, schedules: []
  }
];

describe('ShipService', () => {
  let injector: TestBed;
  let service: ShipService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ShipService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(ShipService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('getShips', () => {
    it('should return list of ships', () => {
      service.getShips().subscribe(ships => {
        expect(ships).toBe(mockShipList);
      });

      const testRequest = httpMock.expectOne('api/Ship/GetAll');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush(mockShipList);

      httpMock.verify();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
