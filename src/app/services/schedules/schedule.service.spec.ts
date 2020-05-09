import { TestBed, getTestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Schedule } from 'src/commons/entities/Ship';

describe('ScheduleService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const apiUrl = 'api/Schedule/';
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ScheduleService = TestBed.get(ScheduleService);
    expect(service).toBeTruthy();
  });

  describe('deleteSchedule', () => {
    it('should send delete request with id in url', () => {
      const idToDelete = 5;
      const url = `${apiUrl}${idToDelete}/`;
      const service: ScheduleService = TestBed.get(ScheduleService);
      service.deleteSchedule(idToDelete)
        .subscribe(x => {
          expect(x).toEqual({});
        });

      const testRequest = httpMock.expectOne(url);
      expect(testRequest.request.method).toBe('DELETE');
      testRequest.flush({});

      httpMock.verify();

    });
  });

  describe('addSchedule', () => {
    it('should send post request with schedule and id in url', () => {
      const shipId = 5;
      const url = `${apiUrl}${shipId}/`;
      const scheduleToAdd: Schedule = {
        id: 0,
        arrival: new Date(),
        departure: new Date()
      };
      const service: ScheduleService = TestBed.get(ScheduleService);
      service.addSchedule(scheduleToAdd, shipId)
        .subscribe(x => {
          expect(x).toEqual({});
        });

      const testRequest = httpMock.expectOne(url);
      expect(testRequest.request.body).toBe(scheduleToAdd);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush({});

      httpMock.verify();

    });

    describe('addSchedule', () => {
      it('should send post request with schedule and shipId in url', () => {
        const shipId = 5;
        const url = `${apiUrl}${shipId}/`;
        const scheduleToAdd: Schedule = {
          id: 0,
          arrival: new Date(),
          departure: new Date()
        };
        const service: ScheduleService = TestBed.get(ScheduleService);
        service.addSchedule(scheduleToAdd, shipId)
          .subscribe(x => {
            expect(x).toEqual({});
          });

        const testRequest = httpMock.expectOne(url);
        expect(testRequest.request.body).toBe(scheduleToAdd);
        expect(testRequest.request.method).toBe('POST');
        testRequest.flush({});

        httpMock.verify();

      });
    });
    describe('editSchedule', () => {
      it('should send put request with schedule', () => {
        const url = `${apiUrl}`;
        const scheduleToEdit: Schedule = {
          id: 0,
          arrival: new Date(),
          departure: new Date()
        };
        const service: ScheduleService = TestBed.get(ScheduleService);
        service.editSchedule(scheduleToEdit)
          .subscribe(x => {
            expect(x).toEqual({});
          });

        const testRequest = httpMock.expectOne(url);
        expect(testRequest.request.body).toBe(scheduleToEdit);
        expect(testRequest.request.method).toBe('PUT');
        testRequest.flush({});

        httpMock.verify();

      });
    });

    describe('bulkAdd', () => {
      it('should send put request with schedules and shipId in url', () => {
        const shipId = 6;
        const url = `${apiUrl}BulkAdd/${shipId}/`;
        const schedulesToAdd: Schedule[] = [{
          id: 0,
          arrival: new Date(),
          departure: new Date()
        }];
        const service: ScheduleService = TestBed.get(ScheduleService);
        service.bulkAdd(schedulesToAdd, shipId)
          .subscribe(x => {
            expect(x).toEqual({});
          });

        const testRequest = httpMock.expectOne(url);
        expect(testRequest.request.body).toBe(schedulesToAdd);
        expect(testRequest.request.method).toBe('POST');
        testRequest.flush({});

        httpMock.verify();
      });
    });
  });
});
