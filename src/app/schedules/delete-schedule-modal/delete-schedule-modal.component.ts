import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-schedule-modal',
  templateUrl: './delete-schedule-modal.component.html',
  styleUrls: ['./delete-schedule-modal.component.scss']
})
export class DeleteScheduleModalComponent implements OnInit {

  selectedSchedule = {};
  constructor() { }

  ngOnInit() {
  }

}
