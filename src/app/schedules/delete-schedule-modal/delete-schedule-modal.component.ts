import { Component, OnInit, Output, Input } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { Schedule } from 'src/commons/entities/Ship';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-schedule-modal',
  templateUrl: './delete-schedule-modal.component.html',
  styleUrls: ['./delete-schedule-modal.component.scss']
})
export class DeleteScheduleModalComponent implements OnInit {

  @Input() selectedSchedule: Schedule;
  @Output() successfulDelete = new EventEmitter();

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  deleteSchedule() {
    if (this.selectedSchedule) {
      this.scheduleService
        .deleteSchedule(this.selectedSchedule.id)
        .subscribe(() => {
          this.successfulDelete.emit(null);
        });
    }
  }
}
