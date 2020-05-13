import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ShipDetailsComponent } from './ship-details.component';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'src/commons/entities/Ship';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { of } from 'rxjs';
import { DeleteScheduleModalComponent } from 'src/app/schedules/delete-schedule-modal/delete-schedule-modal.component';

class ScheduleServiceMock {
  deleteSchedule(scheduleId: number) { return null; }
}

describe('ShipDetailsComponent', () => {
  let component: ShipDetailsComponent;
  let fixture: ComponentFixture<ShipDetailsComponent>;
  let service: ScheduleService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbAccordionModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([])],
      declarations: [
        ShipDetailsComponent,
        DeleteScheduleModalComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                shipId: 5
              }
            }
          }
        },
        {
          provide: ScheduleService, useClass: ScheduleServiceMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date(2020, 9, 30);

      const result = component.addDays(date, 5);

      expect(result.getDate()).toEqual(4);
      expect(result.getMonth()).toEqual(10);
    });

    it('should not change parameter', () => {
      const date = new Date(2020, 10, 10);

      component.addDays(date, 5);

      expect(date.getDate()).toEqual(10);
    });
  });

  describe('previousWeek', () => {
    beforeEach(() => {
      spyOn(component, 'filterSchedules');
    });

    it('should substract 7 days from weekStart and weekEnd', () => {
      component.weekStart = new Date(2020, 5, 1);
      component.weekEnd = new Date(2020, 9, 30);

      component.previousWeek();

      expect(component.weekStart.getDate()).toEqual(25);
      expect(component.weekStart.getMonth()).toEqual(4);
      expect(component.weekEnd.getDate()).toEqual(23);
      expect(component.weekEnd.getMonth()).toEqual(9);
    });

    it('should filter schedules', () => {

      component.previousWeek();

      expect(component.filterSchedules).toHaveBeenCalledTimes(1);
    });
  });

  describe('nextWeek', () => {
    beforeEach(() => {
      spyOn(component, 'filterSchedules');
    });

    it('should add 7 days to weekStart and weekEnd', () => {
      component.weekStart = new Date(2020, 5, 1);
      component.weekEnd = new Date(2020, 9, 30);

      component.nextWeek();

      expect(component.weekStart.getDate()).toEqual(8);
      expect(component.weekStart.getMonth()).toEqual(5);
      expect(component.weekEnd.getDate()).toEqual(6);
      expect(component.weekEnd.getMonth()).toEqual(10);
    });

    it('should filter schedules', () => {

      component.nextWeek();

      expect(component.filterSchedules).toHaveBeenCalledTimes(1);
    });
  });

  describe('modalPreviousWeek', () => {
    beforeEach(() => {
      spyOn(component, 'copyCurrentWeek');
    });

    it('should substract 7 days from modalWeekStart and modalWeekEnd', () => {
      component.modalWeekStart = new Date(2020, 5, 1);
      component.modalWeekEnd = new Date(2020, 9, 30);

      component.modalPreviousWeek();

      expect(component.modalWeekStart.getDate()).toEqual(25);
      expect(component.modalWeekStart.getMonth()).toEqual(4);
      expect(component.modalWeekEnd.getDate()).toEqual(23);
      expect(component.modalWeekEnd.getMonth()).toEqual(9);
    });

    it('should copy current week', () => {

      component.modalPreviousWeek();

      expect(component.copyCurrentWeek).toHaveBeenCalledTimes(1);
    });
  });

  describe('modalNextWeek', () => {
    beforeEach(() => {
      spyOn(component, 'copyCurrentWeek');
    });

    it('should add 7 days to modalWeekStart and modalWeekEnd', () => {
      component.modalWeekStart = new Date(2020, 5, 1);
      component.modalWeekEnd = new Date(2020, 9, 30);

      component.modalNextWeek();

      expect(component.modalWeekStart.getDate()).toEqual(8);
      expect(component.modalWeekStart.getMonth()).toEqual(5);
      expect(component.modalWeekEnd.getDate()).toEqual(6);
      expect(component.modalWeekEnd.getMonth()).toEqual(10);
    });

    it('should copy current week', () => {

      component.modalNextWeek();

      expect(component.copyCurrentWeek).toHaveBeenCalledTimes(1);
    });
  });


  describe('filterSchedules', () => {
    beforeEach(() => {
      component.ship = {
        id: 1,
        name: 'aaa',
        shipOwnerName: 'bb',
        schedules: [],
        closestSchedule: null
      };
    });
    it('should exclude schedules that start before weekStart', () => {
      component.weekStart = new Date(2020, 5, 9);
      component.weekEnd = new Date(2020, 5, 11);
      component.ship.schedules = [
        {
          id: 1,
          arrival: new Date(2020, 5, 8),
          departure: new Date(2020, 5, 10)
        }
      ];
      component.filterSchedules();

      expect(component.schedulesInWeek.length).toEqual(0);
    });
    it('should exclude schedules that ends after weekEnd', () => {
      component.weekStart = new Date(2020, 5, 9);
      component.weekEnd = new Date(2020, 5, 11);
      component.ship.schedules = [
        {
          id: 1,
          arrival: new Date(2020, 5, 13),
          departure: new Date(2020, 5, 14)
        }
      ];
      component.filterSchedules();

      expect(component.schedulesInWeek.length).toEqual(0);
    });
  });
  describe('showDeleteModal', () => {
    let scheduleToDelete: Schedule;
    beforeEach(() => {
      scheduleToDelete = {
        arrival: new Date(),
        departure: new Date(),
        id: 1
      };
    });
    it('should set selectedSchedule to parameter', () => {

      component.showDeleteModal(scheduleToDelete);

      expect(component.selectedSchedule).toBe(scheduleToDelete);
    });

    it('should set deleteModal to true', () => {

      component.showDeleteModal(scheduleToDelete);

      expect(component.deleteModal).toEqual(true);
    });
  });

  describe('hideDeleteModa', () => {
    it('should set deleteModal to false', () => {
      component.hideDeleteModal();

      expect(component.deleteModal).toEqual(false);
    });
  });

  describe('setupWeek', () => {
    it('should set weekStart to begining of week when day is not monday and sunday', () => {
      const date = new Date(2020, 4, 1);

      component.setupWeek(date);

      expect(component.weekStart.getFullYear()).toEqual(2020);
      expect(component.weekStart.getMonth()).toEqual(3);
      expect(component.weekStart.getDate()).toEqual(27);
    });

    it('should set weekStart to begining of week when day is sunday', () => {
      const date = new Date(2020, 4, 3);

      component.setupWeek(date);

      expect(component.weekStart.getFullYear()).toEqual(2020);
      expect(component.weekStart.getMonth()).toEqual(3);
      expect(component.weekStart.getDate()).toEqual(27);
    });

    it('should set weekStart to same day when day is monday', () => {
      const date = new Date(2020, 5, 1);

      component.setupWeek(date);

      expect(component.weekStart.getFullYear()).toEqual(2020);
      expect(component.weekStart.getMonth()).toEqual(5);
      expect(component.weekStart.getDate()).toEqual(1);
    });
  });

  describe('deleteSchedule', () => {
    let scheduleToDelete: Schedule;
    beforeEach(() => {
      injector = getTestBed();
      service = injector.get(ScheduleService);
      spyOn(service, 'deleteSchedule')
        .and
        .returnValue(of('test'));

      spyOn(component, 'hideDeleteModal');
      spyOn(component, 'loadShipData');
      scheduleToDelete = {
        arrival: new Date(),
        departure: new Date(),
        id: 1
      };
    });
    it('should not invoke service when selectedSchedule is null', () => {
      component.selectedSchedule = null;

      component.deleteSchedule();

      expect(service.deleteSchedule).toHaveBeenCalledTimes(0);
    });

    it('should invoke service when selectedSchedule is not null', () => {
      component.selectedSchedule = scheduleToDelete;

      component.deleteSchedule();

      expect(service.deleteSchedule).toHaveBeenCalledWith(scheduleToDelete.id);
      expect(service.deleteSchedule).toHaveBeenCalledTimes(1);
    });

    it('should reload data and hide modal', () => {
      component.selectedSchedule = scheduleToDelete;

      component.deleteSchedule();

      expect(component.loadShipData).toHaveBeenCalledTimes(1);
      expect(component.hideDeleteModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('showEditModal', () => {
    let scheduleToEdit: Schedule;
    const stringDates = ['date1', 'date2'];
    beforeEach(() => {
      scheduleToEdit = {
        arrival: new Date(2020),
        departure: new Date(2019),
        id: 1
      };

      spyOn(component, 'getDateTime')
        .and
        .callFake(date => {
          if (date === scheduleToEdit.arrival) {
            return 'arrival';
          } else if (date === scheduleToEdit.departure) {
            return 'departure';
          }
          return '';
        });

    });
    it('should initialize selectedSchedule with id equal to 0', () => {
      component.selectedSchedule = null;

      component.showEditModal(null);

      expect(component.selectedSchedule).not.toEqual(null);
      expect(component.selectedSchedule.id).toEqual(0);
    });

    it('should set selectedSchedule to parameter', () => {
      component.selectedSchedule = null;

      component.showEditModal(scheduleToEdit);

      expect(component.selectedSchedule).toBe(scheduleToEdit);
    });

    it('should set dates', () => {
      component.selectedSchedule = null;

      component.showEditModal(scheduleToEdit);

      expect(component.arrivalValue).toBe('arrival');
      expect(component.departureValue).toBe('departure');
    });
  });
});
