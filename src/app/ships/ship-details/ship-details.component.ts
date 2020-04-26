import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from 'src/app/services/ships/ship.service';
import { Ship, Schedule } from 'src/commons/entities/Ship';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit {

  shipId: number;
  ship: Ship;
  isLoading = false;
  weekStart = new Date();
  weekEnd = new Date();
  deleteModal = false;
  editModal = false;
  arrivalValue: string;
  departureValue: string;
  selectedSchedule: Schedule = null;
  constructor(private route: ActivatedRoute, private service: ShipService,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.setupWeek();
    this.isLoading = true;
    this.shipId = this.route.snapshot.params.shipId;
    if (this.shipId) {
      this.loadShipData();
    }
  }
  private loadShipData() {
    this.service
      .getShip(this.shipId)
      .subscribe(x => {
        this.ship = x;
        this.isLoading = false;
      });
  }

  setupWeek() {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay() - 6;
    const last = first + 6;

    this.weekStart = new Date(curr.setDate(first));
    this.weekEnd = new Date(curr.setDate(last));
  }
  showDeleteModal(schedule: Schedule) {
    this.selectedSchedule = schedule;
    this.deleteModal = true;
  }
  hideDeleteModal() {
    this.deleteModal = false;
  }

  deleteSchedule() {
    if (this.selectedSchedule) {
      this.scheduleService
        .deleteSchedule(this.selectedSchedule.id)
        .subscribe(() => {
          this.loadShipData();
          this.hideDeleteModal();
        });
    }
  }
  showEditModal(schedule: Schedule) {
    if (!schedule) {
      this.selectedSchedule = { id: 0, arrival: new Date(), departure: new Date() };
    } else {
      this.selectedSchedule = schedule;
      this.selectedSchedule.arrival = new Date(this.selectedSchedule.arrival);
      this.selectedSchedule.departure = new Date(this.selectedSchedule.departure);
    }
    this.arrivalValue = this.getTime(this.selectedSchedule.arrival);
    this.departureValue = this.getTime(this.selectedSchedule.departure);
    this.editModal = true;
  }
  hideEditModal() {
    this.editModal = false;
  }

  getTime(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  saveSchedule() {
    if (this.selectedSchedule) {
      this.selectedSchedule.arrival = new Date(this.arrivalValue);
      this.selectedSchedule.departure = new Date(this.departureValue);
      if (this.selectedSchedule.id) {
        this.scheduleService
          .editSchedule(this.selectedSchedule)
          .subscribe(() => {
            this.loadShipData();
            this.hideEditModal();
          });
      } else {
        this.scheduleService
          .addSchedule(this.selectedSchedule, this.shipId)
          .subscribe(() => {
            this.loadShipData();
            this.hideEditModal();
          });
      }

    }
  }
  get invalidDate() {
    return !(new Date(this.arrivalValue).getFullYear() && new Date(this.departureValue).getFullYear());
  }
}
