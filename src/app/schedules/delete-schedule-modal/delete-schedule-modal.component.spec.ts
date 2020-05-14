import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { DeleteScheduleModalComponent } from './delete-schedule-modal.component';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { Schedule } from 'src/commons/entities/Ship';
import { of } from 'rxjs';

class ScheduleServiceMock {
  deleteSchedule(scheduleId: number) { return null; }
}

describe('DeleteScheduleModalComponent', () => {
  let component: DeleteScheduleModalComponent;
  let fixture: ComponentFixture<DeleteScheduleModalComponent>;
  let service: ScheduleService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteScheduleModalComponent],
      providers: [{
        provide: ScheduleService, useClass: ScheduleServiceMock
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('deleteSchedule', () => {
    let scheduleToDelete: Schedule;
    beforeEach(() => {
      injector = getTestBed();
      service = injector.get(ScheduleService);
      spyOn(service, 'deleteSchedule')
        .and
        .returnValue(of(''));

      spyOn(component.successfulDelete, 'emit');

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

    it('should emit event', () => {
      component.selectedSchedule = scheduleToDelete;

      component.deleteSchedule();

      expect(component.successfulDelete.emit).toHaveBeenCalledTimes(1);
    });
  });
});
